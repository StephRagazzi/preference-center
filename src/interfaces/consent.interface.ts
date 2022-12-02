export interface IConsent {
    id: string;
    enabled: boolean;
}

export interface IConsents {
    consents: IConsent[];
}