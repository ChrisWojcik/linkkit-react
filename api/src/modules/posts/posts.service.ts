import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, FindOptions } from 'sequelize';
import { User } from '@/api/modules/auth/models';
import { Post, Comment } from './models';
import { CreatePostDto, AddCommentDto, GetPostQueryParams } from './dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment
  ) {}

  async findLatest(): Promise<Post[]> {
    const query: FindOptions<Post> = {
      subQuery: false,
      limit: 20,
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
        User,
      ],
      group: ['Post.id', 'user.id'],
    };

    return this.postModel.findAll(query);
  }

  async findById(id: number, options: GetPostQueryParams = {}): Promise<Post> {
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
        User,
      ],
      group: ['Post.id', 'user.id'],
    };

    const post = await this.postModel.findOne(query);

    if (!post) {
      throw new NotFoundException();
    }

    if (options.includeComments === 'true') {
      // fetch all comments at once and build the
      // tree in memory client-side
      const comments = await this.commentModel.findAll({
        where: {
          postId: id,
        },
        include: [User],
        order: [['id', 'DESC']],
      });

      post.setDataValue('comments', comments);
    }

    return post;
  }

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { id } = await this.postModel.create({
      ...createPostDto,
      userId: user.id,
    });

    return this.findById(id);
  }

  async addComment(addCommentDto: AddCommentDto, user: User): Promise<Comment> {
    const { id } = await this.commentModel.create({
      ...addCommentDto,
      userId: user.id,
    });

    return this.commentModel.findOne({ where: { id }, include: [User] });
  }
}
