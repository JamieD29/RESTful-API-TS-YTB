import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "videos",
})
export default class Video extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true
  })
  id!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  channel_name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  thumbnail!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  views!: number;
}