import { IConsent } from "../../interfaces/consent.interface";
import { IUser } from "../../interfaces/user.interface";

export class UpdateUserDto {
    readonly user: IUser;
    readonly consents: IConsent[];
}
