import { Controller, Get, Post, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { IUserConsent } from '../interfaces/userConsent.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const errorMessage = 'The e-mail address already exists';
        try {
            return await this.userService.create(createUserDto);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: errorMessage,
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
        return this.userService.getUser(id);
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
