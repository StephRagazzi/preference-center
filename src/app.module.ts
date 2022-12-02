import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }