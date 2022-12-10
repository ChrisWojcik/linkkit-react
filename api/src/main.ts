import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import passport from 'passport';
import { createClient } from 'redis';
import createRedisStore from 'connect-redis';
import { AppModule } from '@/api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const RedisStore = createRedisStore(session);

  const redisHost = configService.get<string>('redis.host');
  const redisPort = configService.get<number>('redis.port');

  const redisClient = createClient({
    url: `redis://${redisHost}:${redisPort}`,
    legacyMode: true,
  });

  await redisClient.connect();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get<string>('secretKey'),
      name: '_linkkit_sess',
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: configService.get<string>('nodeEnv') !== 'development',
        sameSite: 'lax',
      },
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(configService.get<number>('port'));
}

bootstrap();
