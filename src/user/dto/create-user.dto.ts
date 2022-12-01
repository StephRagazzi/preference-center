import { IConsent, IConsents } from "../interfaces/consent.interface";
import { IUser } from "../interfaces/user.interface";

export class CreateUserDto implements IUser, IConsents {
    readonly id: string;
    readonly email: string;
    readonly consents: IConsent[];
}
