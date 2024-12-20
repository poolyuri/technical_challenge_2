import { Injectable } from '@nestjs/common';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor() {}

  sources: UserM[] = [{
    id: 1,
    username: 'admin',
    password: '$2b$10$fJGPpV4VH2SS9pdLRUawBephZTtgjGZTzfaz1NpKsvAM0D5/3mW2u',
    createDate: new Date,
    updatedDate: new Date,
    lastLogin: new Date,
    hashRefreshToken: '1'
  }]

  async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
    const user = await this.get(username);
    const newUser = Object.assign(user, refreshToken);
    this.sources = this.sources.map((t) => t.username === username ? newUser : user);
  }

  async getUserByUsername(username: string): Promise<UserM> {
    const user = await this.get(username);
    console.log();

    if (!user) {
      return null;
    }

    return user;
  }

  async updateLastLogin(username: string): Promise<void> {
    const user = await this.get(username);
    const lastLogin: any = new Date();
    const newUser = Object.assign(user, lastLogin);
    this.sources = this.sources.map((t) => t.username === username ? newUser : user);
  }

  async get(username: string): Promise<UserM> {
    return this.sources.find(t => t.username === username);
  }
}
