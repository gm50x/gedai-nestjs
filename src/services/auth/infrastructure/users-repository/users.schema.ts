import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ index: true, unique: true })
  id: string;

  @Prop()
  name: string;

  @Prop({ index: true, unique: true })
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
