import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfig, TracingModule } from './config';
import { AuthModule } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TracingModule,
    AuthModule,
    MongooseModule.forRootAsync({ useClass: MongooseConfig }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
