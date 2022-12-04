import { IConsent } from './consent.interface';

export interface IUserConsent {
    readonly id: string;
    readonly email: string;
    readonly consents: IConsent[];
}