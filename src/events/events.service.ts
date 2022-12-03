import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserConsent } from '../interfaces/userConsent.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class EventsService {
    constructor(@Inject('USERCONSENT_MODEL') private readonly userConsentModel: Model<UserConsent>) { }

    async update(updateUserDto: UpdateUserDto): Promise<UserConsent> {
        const consents = updateUserDto.consents;
        const updatedUser = await this.userConsentModel.findOneAndUpdate({ id: updateUserDto.user.id }, { $set: { consents: consents } }, { new: true });
        return updatedUser;
    }
}