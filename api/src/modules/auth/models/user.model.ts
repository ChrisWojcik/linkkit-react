import {
  Column,
  DataType,
  Model,
  Table,
  DefaultScope,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['githubId'] },
}))
@Table({ tableName: 'user', timestamps: true })
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  readonly id!: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  githubId!: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  username!: string;
}
