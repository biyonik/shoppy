import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUserByContent = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContent(context),
);
