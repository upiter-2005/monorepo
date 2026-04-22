import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './auth.dto';
import type { Response, Request } from 'express';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  private setRefreshCookie(res: Response, refreshToken: string): void {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  private clearRefreshCookie(res: Response): void {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });
  }

  @Post('login')
  async login(
    @Body() payload: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const { email, role, accessToken, refreshToken } = await this.authService.login(payload);

    this.setRefreshCookie(res, refreshToken);

    return { email, role, accessToken };
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const httpRefreshToken = req.cookies.refreshToken;
    const { email, role, accessToken, refreshToken } =
      await this.tokenService.refresh(httpRefreshToken);

    this.setRefreshCookie(res, refreshToken);

    return { email, role, accessToken };
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const httpRefreshToken = req.cookies.refreshToken;

    await this.tokenService.deleteByToken(httpRefreshToken);

    this.clearRefreshCookie(res);

    return { message: 'Logged out successfully' };
  }
}
