import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { setRefreshCookie } from '../../helpers/refresh.cookie';
import { SessionService } from '../session.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {
    super();
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context);

      return true;
    } catch {
      const request = context.switchToHttp().getRequest<Request>();
      const response = context.switchToHttp().getResponse<Response>();

      const requestRefresh = request.cookies.refreshToken;

      if (!requestRefresh) {
        throw new UnauthorizedException('Refresh token is missing');
      }

      const session = await this.sessionService.findByToken(requestRefresh);

      if (!session) {
        throw new UnauthorizedException('Session not found, you should login again');
      }

      const user = await this.userService.findById(session.user_id);

      if (!user) {
        throw new Error('User not found');
      }

      const { accessToken, refreshToken } = await this.sessionService.refresh(requestRefresh, {
        email: user.email,
        role: user.role,
        sub: user.id,
      });

      response.setHeader('x-access-token', accessToken);

      setRefreshCookie(response, refreshToken);

      return true;
    }
  }
}
