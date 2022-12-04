import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserConsent } from '../interfaces/userConsent.interface';

@Injectable()
export class UsersService {
    constructor(@Inject('USERCONSENT_MODEL') private readonly userConsentModel: Model<IUserConsent>) { }

    async create(createUserDto: CreateUserDto): Promise<IUserConsent> {
        const createdUser = await this.userConsentModel.create(createUserDto);
        return createdUser;
    }

    async findAll(): Promise<IUserConsent[]> {
        return this.userConsentModel.find({}, '-_id').exec();
    }

    async delete(): Promise<void> {
        const deletedUser = await this.userConsentModel.deleteMany({});
    }

    async getUser(id: string): Promise<IUserConsent> {
        const user = await this.userConsentModel.findOne({ id: id }, '-_id');
        return user;
    }
}