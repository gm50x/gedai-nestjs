import { randomUUID } from 'crypto';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, id: string = randomUUID()) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  generatePassword() {
    this.password = randomUUID().split('-').at(0);
  }

  securePassword() {
    // TODO: SHA256 THIS
    this.password = 'GIBBERISH';
  }
}
