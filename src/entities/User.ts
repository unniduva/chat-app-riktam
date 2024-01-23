import { Entity, PrimaryGeneratedColumn, Column,ManyToMany,JoinTable } from 'typeorm';
import { Group } from './Group';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(()=>Group)
  @JoinTable()
  groups:Group[]

  @Column({
    default:new Date()
  })
  createdAt: Date;
}