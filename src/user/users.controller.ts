import { Controller, Get, Post, Delete, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserConsent } from './interfaces/userConsent.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }


    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return this.userService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<UserConsent[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<UserConsent> {
        return this.userService.getOne(id);
    }

    @Delete()
    async delete() {
        try {
            const deletedUser = await this.userService.delete();
        } catch (err) {
            return null;
        }
    }
}
