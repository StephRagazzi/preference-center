import { IConsent } from './consent.interface';

export interface UserConsent {
    readonly id: string;
    readonly email: string;
    readonly consents: IConsent[];
}