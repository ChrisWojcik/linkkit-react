import { Controller, Query, Body, Get, Post, UseGuards } from '@nestjs/common';
import {
  ValidationPipe,
  ParseSerialDbIdPipe,
} from '@/api/common/validation/pipes';
import { AuthenticatedGuard } from '@/api/modules/auth/guards';
import { User } from '@/api/modules/auth/models';
import { CurrentUser } from '@/api/modules/auth/decorators';
import { PostsService } from './posts.service';
import { CreatePostDto, AddCommentDto, GetPostQueryParams } from './dto';
import { Post as PostModel, Comment } from './models';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('api/posts.latest')
  async findLatest(): Promise<PostModel[]> {
    return this.postsService.findLatest();
  }

  @Get('api/posts.get')
  async findById(
    @Query('id', ParseSerialDbIdPipe) id: number,
    @Query(ValidationPipe) options: GetPostQueryParams
  ): Promise<PostModel> {
    return this.postsService.findById(id, options);
  }

  @Post('api/posts.create')
  @UseGuards(AuthenticatedGuard)
  async create(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @CurrentUser() user: User
  ): Promise<PostModel> {
    return this.postsService.create(createPostDto, user);
  }

  @Post('api/posts.comment')
  @UseGuards(AuthenticatedGuard)
  async comment(
    @Body(ValidationPipe) addCommentDto: AddCommentDto,
    @CurrentUser() user: User
  ): Promise<Comment> {
    return this.postsService.addComment(addCommentDto, user);
  }
}
