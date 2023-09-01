import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsersRepository, User as UserEntity } from '../../domain';
import { User } from './users.schema';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@InjectModel(User.name) private readonly dao: Model<User>) {}

  async save(user: UserEntity): Promise<UserEntity> {
    await this.dao.create(user);
    return user;
  }
}
