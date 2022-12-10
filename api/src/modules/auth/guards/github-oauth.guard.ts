import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GithubOauthGuard extends AuthGuard('github') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    // initialize the session and extract and preserve data
    // that's still needed after the session is regenerated
    const request = context.switchToHttp().getRequest();
    const returnTo = request.session.oAuthReturnTo;

    await super.logIn(request);
    request.session.oAuthReturnTo = returnTo;

    return true;
  }
}
