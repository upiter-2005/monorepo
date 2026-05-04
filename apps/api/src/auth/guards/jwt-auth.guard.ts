import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { getRefreshCookie, setRefreshCookie } from '../../helpers/cookie';
import { SessionService } from '../session.service';
import { UserService } from '../../user/user.service';
import { TOKEN_ERRORS } from '@org/constants';
import { setResponseHeader } from '../../helpers/setResponseHeader';

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
      return (await super.canActivate(context)) as boolean;
    } catch {
      const request = context.switchToHttp().getRequest<Request>();

      const requestRefreshToken = getRefreshCookie(request);

      if (!requestRefreshToken) {
        throw new UnauthorizedException(TOKEN_ERRORS.TOKEN_MISSING);
      }

      const session = await this.sessionService.findByToken(requestRefreshToken);

      if (!session) {
        throw new UnauthorizedException(TOKEN_ERRORS.SESSION_NOT_FOUND);
      }

      const user = await this.userService.findById(session.user_id);

      if (!user) {
        throw new Error(TOKEN_ERRORS.USER_NOT_FOUND);
      }

      const { accessToken, refreshToken } = await this.sessionService.refresh(requestRefreshToken, {
        email: user.email,
        role: user.role,
        sub: user.id,
      });

      const response = context.switchToHttp().getResponse<Response>();
      setResponseHeader(response, 'x-access-token', accessToken);
      setRefreshCookie(response, refreshToken);

      return true;
    }
  }
}
