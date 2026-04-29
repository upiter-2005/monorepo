import { Body, Controller, Post, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizedDto, LoginDto } from './auth.dto';
import type { Response, Request } from 'express';
import { TokenService } from './token.service';
import { setRefreshCookie } from '../helpers/refresh.cookie';
import { clearRefreshCookie } from '../helpers/refresh.cookie';
import { LogoutDto } from './auth.types';
import { STATUS } from '@org/constants';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
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

    const session = await this.tokenService.findByToken(httpRefreshToken);

    if (!session) {
      throw new UnauthorizedException('Session not found, you should login again');
    }

    const user = await this.userService.findById(session.user_id);

    if (!user) {
      throw new Error('User not found');
    }

    const { email, role, accessToken, refreshToken } = await this.tokenService.refresh(
      httpRefreshToken,
      { email: user.email, role: user.role, sub: user.id },
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

    return { status: STATUS.REDIRECT };
  }
}
