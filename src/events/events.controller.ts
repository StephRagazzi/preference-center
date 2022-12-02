import { Body, Controller, Post } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    constructor(private readonly eventService: EventsService) { }

    @Post()
    async create(@Body() updateUserDto: UpdateUserDto) {
        return await this.eventService.update(updateUserDto);
    }
}