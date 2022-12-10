import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getReturnToUrl } from '@/api/modules/auth/utils';

// use declaration merging
// see: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-session/index.d.ts#L203
declare module 'express-session' {
  interface SessionData {
    oAuthReturnTo?: string;
  }
}

/*
 * Saves the returnTo url before passport redirects to github
 * so we can redirect back to the user's location after login
 */
@Injectable()
export class SessionReturnToMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const returnTo = getReturnToUrl(request.query.returnTo);
    request.session.oAuthReturnTo = returnTo;

    next();
  }
}
