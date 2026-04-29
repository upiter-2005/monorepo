import { Body, Controller, Post, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizedDto, LoginDto } from './auth.dto';
import type { Response, Request } from 'express';
import { SessionService } from './session.service';
import { setRefreshCookie } from '../helpers/refresh.cookie';
import { clearRefreshCookie } from '../helpers/refresh.cookie';
import { LogoutDto } from './auth.types';
import { STATUS } from '@org/constants';

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
    const requestRefresh = req.cookies.refreshToken;

    if (!requestRefresh) {
      throw new UnauthorizedException('Refresh token not found');
    }

    await this.sessionService.deleteByToken(requestRefresh);

    clearRefreshCookie(res);

    return { status: STATUS.REDIRECT };
  }
}
