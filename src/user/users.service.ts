import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserConsent } from '../interfaces/userConsent.interface';

@Injectable()
export class UsersService {
    constructor(@Inject('USERCONSENT_MODEL') private readonly userConsentModel: Model<UserConsent>) { }

    async create(createUserDto: CreateUserDto): Promise<UserConsent> {
        const createdUser = await this.userConsentModel.create(createUserDto);
        return createdUser;
    }

    async findAll(): Promise<UserConsent[]> {
        return this.userConsentModel.find({}, '-_id').exec();
    }

    async delete(): Promise<void> {
        const deletedUser = await this.userConsentModel.deleteMany({});
    }

    async getOne(id: string): Promise<UserConsent> {
        const deletedUser = await this.userConsentModel.findOne({ id: id }, '-_id');
        console.log(deletedUser);
        return deletedUser;
    }
}