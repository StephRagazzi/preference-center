import { Mongoose } from 'mongoose';
import { UserConsentSchema } from '../schemas/userConsent.schema';

export const usersProviders = [
    {
        provide: 'USERCONSENT_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('UserConsent', UserConsentSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
