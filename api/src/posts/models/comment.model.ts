import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from './post.model';

@Table({ tableName: 'comments', timestamps: true, underscored: true })
export class Comment extends Model<Comment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    allowNull: false,
  })
  readonly id!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  text!: string;

  @ForeignKey(() => Post)
  @Column({ allowNull: false })
  postId!: string;

  @ForeignKey(() => Comment)
  @Column({ allowNull: true })
  parentId: string;
}
