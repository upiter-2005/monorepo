import { Body, Controller, Post, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizedDto, LoginDto } from './auth.dto';
import type { Response, Request } from 'express';
import { TokenService } from './token.service';
import { setRefreshCookie } from '../helpers/set.refresh.cookie';
import { clearRefreshCookie } from '../helpers/clear.refresh.cookie';
import { LogoutDto } from './auth.types';
import { TokenRepository } from './token.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  @Post('login')
  async login(
    @Body() payload: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizedDto> {
    const { id, email, role } = await this.authService.login(payload);
    const { accessToken, refreshToken } = await this.tokenService.generate({
      email,
      role,
      sub: id,
    });
    await this.tokenService.create(id, refreshToken);

    setRefreshCookie(res, refreshToken);

    return { email, role, accessToken };
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizedDto> {
    const httpRefreshToken = req.cookies.refreshToken;

    if (!httpRefreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const isValid = this.tokenService.verify(httpRefreshToken);

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const session = await this.tokenRepository.findByRefreshToken(httpRefreshToken);

    if (!session) {
      throw new UnauthorizedException('Session not found, you should login again');
    }

    const { user_id } = session;

    const { email, role, accessToken, refreshToken } = await this.tokenService.refresh(
      httpRefreshToken,
      user_id,
    );

    setRefreshCookie(res, refreshToken);

    return { email, role, accessToken };
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<LogoutDto> {
    const httpRefreshToken = req.cookies.refreshToken;

    if (!httpRefreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    await this.tokenService.deleteByToken(httpRefreshToken);

    clearRefreshCookie(res);

    return { status: 302 };
  }
}
