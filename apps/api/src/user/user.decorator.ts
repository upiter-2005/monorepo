import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((userProp: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  return userProp ? user[userProp] : user;
});
