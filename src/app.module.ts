import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomapperModule } from './common';
import { TracingModule } from './config';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TracingModule,
    AuthModule,
    AutomapperModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
