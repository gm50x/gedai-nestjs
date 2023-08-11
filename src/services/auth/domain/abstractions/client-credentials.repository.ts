export interface IClientCredentialsRepository {
  save(): Promise<void>;
}

export abstract class IClientCredentialsRepository
  implements IClientCredentialsRepository {}
