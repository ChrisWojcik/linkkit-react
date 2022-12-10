import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import configuration from '@/api/config/configuration';
import { AppController } from '@/api/app.controller';
import { AuthModule } from '@/api/modules/auth/auth.module';
import { PostsModule } from '@/api/modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.db'),
        autoLoadModels: true,
        synchronize: false,
      }),
    }),
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  /*providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],*/
})
export class AppModule {}
