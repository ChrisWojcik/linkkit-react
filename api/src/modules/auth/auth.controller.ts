import {
  Controller,
  Get,
  UseGuards,
  Header,
  Req,
  Res,
  Next,
  Session,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { GithubOauthGuard } from './guards';
import { getReturnToUrl } from './utils';

@Controller()
export class AuthController {
  @Get('auth/github')
  @UseGuards(GithubOauthGuard)
  async loginWithGithub() {
    // Guard redirects to Github
  }

  @Get('auth/github/callback')
  @UseGuards(GithubOauthGuard)
  async githubCallback(
    @Res() response: Response,
    @Session() session: Record<string, any>
  ) {
    const returnTo = getReturnToUrl(session.oAuthReturnTo);
    delete session.oAuthReturnTo;

    response.redirect(returnTo);
  }

  @Get('auth/me')
  @Header('content-type', 'application/json; charset=utf-8')
  async getCurrentUser(@Req() request: Request) {
    return request.user || 'null';
  }

  @Get('auth/logout')
  async logout(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction
  ) {
    request.logout((err) => {
      if (err) {
        return next(err);
      }

      const returnTo = getReturnToUrl(request.query.returnTo);
      response.redirect(returnTo);
    });
  }
}
