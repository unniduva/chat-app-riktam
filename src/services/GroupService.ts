import AppDataSource from '../db';
import { Group } from '../entities/Group';
import { User } from '../entities/User';

export class GroupService {
  private groupRepository = AppDataSource.getRepository(Group);

  async createGroup(name: string,groupAdmin:any): Promise<any> {
    const group = new Group();
    group.name = name;
    group.groupAdmin =groupAdmin;

  const groupAdded = await this.groupRepository.save(group);

  return groupAdded;
  }

  async editGroup(group: Group, newName: string): Promise<Group> {
    group.name = newName;
    return await this.groupRepository.save(group);
  }

  async removeGroup(group: Group): Promise<void> {
    await this.groupRepository.remove(group);
  }

  async addUserToGroup(user: User, group: Group): Promise<any> {
    user.groups = user.groups || [];
    const alreadyExist = user.groups.find(item=>item.id===group.id)
    if(!alreadyExist){
      user.groups.push(group);
    }else {
      throw new Error("User already added to this group "+group.name)
    }
   return await AppDataSource.getRepository(User).save(user);
  }

  async removeUserFromGroup(user: User, group: Group): Promise<User> {
    user.groups = user.groups.filter((g) => g.id !== group.id);
    return await AppDataSource.getRepository(User).save(user);
  }
  async findGroupById(groupId: number): Promise<Group | null> {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.groupAdmin', 'groupAdmin')
      .leftJoinAndSelect('group.users', 'users')
      .where('group.id = :groupId', { groupId })
      .getOne();
  }
  async findUserById(userId: number): Promise<User | null> {
    return AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.groups', 'groups')
      .where('user.id = :userId', { userId })
      .getOne();
  }
}