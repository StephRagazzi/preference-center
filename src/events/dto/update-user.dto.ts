import { IConsent } from "src/interfaces/consent.interface";
import { IUser } from "src/interfaces/user.interface";

export class UpdateUserDto {
    readonly user: IUser;
    readonly consents: IConsent[];
}