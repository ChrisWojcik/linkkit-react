import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './github.strategy';
import { AuthSerializer } from './auth-serializer.provider';
import { SessionReturnToMiddleware } from './middleware';
import { User } from './models';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [AuthService, GithubStrategy, AuthSerializer],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionReturnToMiddleware)
      .forRoutes({ path: 'auth/github', method: RequestMethod.GET });
  }
}
