import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { Group } from './Group';
import { Like } from './Like';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User)
  @JoinColumn()
  sender: User;

  @ManyToOne(() => Group, group => group.messages)
  @JoinColumn()
  group: Group;

  @OneToMany(() => Like, like => like.message)
  likes: Like[];
}