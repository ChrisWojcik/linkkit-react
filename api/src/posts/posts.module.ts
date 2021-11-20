import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post, Comment } from './models';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [SequelizeModule.forFeature([Post, Comment])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
