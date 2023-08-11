import { IClientCredentialsRepository } from '../../domain';
export class ClientCredentialsRepository
  implements IClientCredentialsRepository
{
  async save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
