import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { slugify } from '../../common/utils';
import { Comment } from './comment.model';

@Table({ tableName: 'posts', timestamps: true, underscored: true })
export class Post extends Model<Post> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    allowNull: false,
  })
  readonly id!: string;

  @Column({ type: DataType.STRING(300), allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING(2048), allowNull: true })
  sharedLink?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  text?: string;

  @Column(DataType.VIRTUAL)
  get permalink(): string {
    return `/k/${this.id}/${slugify(this.title)}`;
  }

  @Column(DataType.VIRTUAL)
  get numComments(): number {
    return this.getDataValue('numComments') || 0;
  }

  @HasMany(() => Comment)
  comments: Comment[];
}
