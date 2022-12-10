import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  Table,
  DefaultScope,
} from 'sequelize-typescript';
import { User } from '@/api/modules/auth/models';
import { Post } from './post.model';

@DefaultScope(() => ({
  attributes: { exclude: ['userId'] },
}))
@Table({ tableName: 'comment', timestamps: true })
export class Comment extends Model<Comment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  readonly id!: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  text!: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId!: number;

  @ForeignKey(() => Post)
  @Column({ allowNull: false })
  postId!: number;

  @ForeignKey(() => Comment)
  @Column({ allowNull: true })
  parentId: number;

  @BelongsTo(() => User)
  user: User;
}
