import { Controller, Get, Post, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { IUserConsent } from '../interfaces/userConsent.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.userService.create(createUserDto);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: error.message,
            }, HttpStatus.UNPROCESSABLE_ENTITY, {
                cause: error
            });
        }
    }

    @Get()
    async findAll(): Promise<IUserConsent[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<IUserConsent> {
        const errorMessage = 'User not found!';
        const user = await this.userService.getUser(id);
        if (user != null) {
            return user;
        }
        throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    @Delete()
    async deleteAll() {
        return this.userService.deleteAll();
    }
}
