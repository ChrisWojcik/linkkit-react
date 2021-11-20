import { Controller, Body, Query, Get, Post, UseFilters } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ListPostsCursorDto,
  CreatePostDto,
  GetPostQueryParams,
  AddCommentDto,
} from './dto';
import { Post as PostModel, Comment } from './models';
import { ValidationPipe, ParseDbIdPipe } from '../common/validation/pipes';
import {
  PaginatedModel,
  ParsePaginationCursorPipe,
} from '../common/pagination';
import { ForeignKeyConstraintErrorFilter } from '../common/filters';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('api/posts.latest')
  async findLatest(
    @Query('cursor', ParsePaginationCursorPipe)
    cursor: ListPostsCursorDto
  ): Promise<PaginatedModel<'posts', PostModel, ListPostsCursorDto>> {
    return this.postsService.findLatest(cursor);
  }

  @Post('api/posts.create')
  async create(
    @Body(ValidationPipe) createPostDto: CreatePostDto
  ): Promise<PostModel> {
    return this.postsService.create(createPostDto);
  }

  @Get('api/posts.get')
  async findById(
    @Query('id', ParseDbIdPipe) id: string,
    @Query(ValidationPipe) options: GetPostQueryParams
  ): Promise<PostModel> {
    return this.postsService.findById(id, options);
  }

  @Post('api/posts.comment')
  @UseFilters(ForeignKeyConstraintErrorFilter)
  async comment(
    @Body(ValidationPipe) addCommentDto: AddCommentDto
  ): Promise<Comment> {
    return this.postsService.addComment(addCommentDto);
  }
}
