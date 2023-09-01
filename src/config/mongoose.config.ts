import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const uri = this.config.getOrThrow('MONGO_URI');
    return { uri };
  }
}
