import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracingModule } from './config';
import { AuthModule } from './services';

@Module({
  imports: [ConfigModule.forRoot(), TracingModule, AuthModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
