import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, FindOptions } from 'sequelize';
import { Post, Comment } from './models';
import {
  ListPostsCursorDto,
  CreatePostDto,
  GetPostQueryParams,
  AddCommentDto,
} from './dto';
import { PaginationCursor, PaginatedModel } from 'src/common/pagination';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment
  ) {}

  async findLatest(
    cursor: ListPostsCursorDto
  ): Promise<PaginatedModel<'posts', Post, ListPostsCursorDto>> {
    const perPage = 20;

    const query: FindOptions<Post> = {
      subQuery: false,
      limit: perPage + 1,
      order: [['id', 'DESC']],
      attributes: {
        include: [
          [
            Sequelize.cast(
              Sequelize.fn('COUNT', Sequelize.col('comments.id')),
              'int'
            ),
            'numComments',
          ],
        ],
      },
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: [],
        },
      ],
      group: ['Post.id'],
    };

    if (cursor) {
      query.where = {
        id: {
          [Op.lte]: cursor.id,
        },
      };
    }

    const posts = await this.postModel.findAll(query);

    let nextCursor = null;

    if (posts.length > perPage) {
      const nPlusOnePost = posts.pop();
      nextCursor = new PaginationCursor({ id: nPlusOnePost.id });
    }

    return { posts, nextCursor };
  }

  async findById(id: string, options: GetPostQueryParams): Promise<Post> {
    const query: FindOptions<Post> = {
      where: { id },
      attributes: {
        include: [
          [
            Sequelize.cast(
              Sequelize.fn('COUNT', Sequelize.col('comments.id')),
              'int'
            ),
            'numComments',
          ],
        ],
      },
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: [],
        },
      ],
      group: ['Post.id'],
    };

    const post = await this.postModel.findOne(query);

    if (!post) {
      throw new NotFoundException();
    }

    if (options.includeComments === 'true') {
      // for now: fetch all comments at once and build the
      // tree in memory client-side
      const comments = await this.commentModel.findAll({
        where: {
          postId: id,
        },
        order: [['id', 'DESC']],
      });

      post.setDataValue('comments', comments);
    }

    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postModel.create(createPostDto);
  }

  async addComment(addCommentDto: AddCommentDto): Promise<Comment> {
    return this.commentModel.create(addCommentDto);
  }
}
