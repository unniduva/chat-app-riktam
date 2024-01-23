import AppDataSource from '../db';
import { User } from '../entities/User';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(username: string, password: string): Promise<any> {
    const user = new User();
    user.username = username;
    user.password = password;

    return await this.userRepository.save(user);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({where:{username} });
  }
}