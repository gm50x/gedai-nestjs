import { User } from '../entities';

export abstract class IUsersRepository {
  abstract save(user: User): Promise<User>;
}
