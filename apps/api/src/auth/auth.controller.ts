import { Body, Controller, Post, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizedDto, LoginDto } from './auth.dto';
import type { Response, Request } from 'express';
import { SessionService } from './session.service';
import { setRefreshCookie } from '../helpers/cookie';
import { clearRefreshCookie } from '../helpers/cookie';
import { LogoutDto } from './auth.types';
import { STATUS, TOKEN_ERRORS } from '@org/constants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('login')
  async login(
    @Body() payload: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizedDto> {
    const { id, email, role } = await this.authService.login(payload);
    const { accessToken, refreshToken } = await this.sessionService.generate({
      email,
      role,
      sub: id,
    });
    await this.sessionService.create(id, refreshToken);

    setRefreshCookie(res, refreshToken);

    return { email, role, accessToken };
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<LogoutDto> {
    const requestRefreshToken = req.cookies.refreshToken;

    if (!requestRefreshToken) {
      throw new UnauthorizedException(TOKEN_ERRORS.REFRESH_TOKEN_NOT_FOUND);
    }

    await this.sessionService.deleteByToken(requestRefreshToken);

    clearRefreshCookie(res);

    return { status: STATUS.REDIRECT };
  }
}
