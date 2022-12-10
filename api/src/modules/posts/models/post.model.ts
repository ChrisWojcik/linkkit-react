import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Model,
  Table,
  DefaultScope,
} from 'sequelize-typescript';
import { slugify } from '@/api/common/utils';
import { User } from '@/api/modules/auth/models';
import { Comment } from './comment.model';

@DefaultScope(() => ({
  attributes: { exclude: ['userId'] },
}))
@Table({ tableName: 'post', timestamps: true })
export class Post extends Model<Post> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    allowNull: false,
  })
  readonly id!: number;

  @Column({ type: DataType.STRING(300), allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING(2048), allowNull: true })
  sharedLink?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  text?: string;

  @Column(DataType.VIRTUAL)
  get permalink(): string | undefined {
    if (!this.id || !this.title) {
      return undefined;
    }

    const slug = slugify(this.title);

    return `${process.env.BASE_URL}/k/${this.id}/${slug}`;
  }

  @Column(DataType.VIRTUAL)
  get numComments(): number | undefined {
    return this.getDataValue('numComments');
  }

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId!: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];
}
