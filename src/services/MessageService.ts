import { Message } from '../entities/Message';
import { Like } from '../entities/Like';
import { Group } from '../entities/Group';
import AppDataSource from '../db';

export class MessageService {
  private messageRepository = AppDataSource.getRepository(Message);
  private likeRepository = AppDataSource.getRepository(Like);
  private groupRepository = AppDataSource.getRepository(Group);

  async createMessage(groupId: number, senderId: number, content: string): Promise<void> {
    const isUserInGroup = await this.isUserInGroup(groupId, senderId);

    if (!isUserInGroup) {
      throw new Error('User is not a member of the group');
    }

    const message = this.messageRepository.create({
      group: { id: groupId },
      sender: { id: senderId },
      content,
    });

    await this.messageRepository.save(message);
  }

  async likeMessage(messageId: number, userId: number): Promise<void> {
    const message = await this.messageRepository.findOneBy({id:messageId});

    if (!message) {
      throw new Error('Message not found');
    }

    const isUserInGroup = await this.isUserInGroup(message.group.id, userId);

    if (!isUserInGroup) {
      throw new Error('User is not a member of the group');
    }

    const like = this.likeRepository.create({
      message: { id: messageId },
      user: { id: userId },
    });

    await this.likeRepository.save(like);
  }

  async listMessagesByGroup(groupId: number): Promise<Message[]> {
    const isGroupExist = await this.groupRepository.findOneBy({id:groupId});

    if (!isGroupExist) {
      throw new Error('Group not found');
    }

    return this.messageRepository.find({
      where: { group: { id: groupId } },
      relations: ['sender', 'likes', 'likes.user'],
    });
  }

  private async isUserInGroup(groupId: number, userId: number): Promise<boolean> {
    const group = await this.groupRepository.findOneBy({id:groupId});

    if (!group) {
      return false;
    }

    return group.users.some(user => user.id === userId);
  }
}