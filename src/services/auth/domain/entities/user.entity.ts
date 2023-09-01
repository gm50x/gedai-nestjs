import { createHmac, randomUUID } from 'crypto';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(
    name: string,
    email: string,
    id: string = randomUUID(),
    password: string = null,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  generatePassword() {
    this.password = randomUUID().split('-').at(0);
  }

  securePassword() {
    this.password = createHmac('sha256', this.id)
      .update(this.password)
      .digest('hex');
  }
}
