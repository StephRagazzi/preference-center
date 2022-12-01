import { Document } from 'mongoose';
import { IConsent } from './consent.interface';

export interface UserConsent extends Document {
    readonly id: string;
    readonly email: string;
    readonly consents: IConsent[];
}