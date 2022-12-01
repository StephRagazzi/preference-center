import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
class Consent {
    @Prop()
    id: string;

    @Prop()
    enabled: boolean;
}
@Schema()
class Consents {
    @Prop([Consent])
    consent: Consent[];
}

@Schema()
export class UserConsent {
    @Prop()
    id: string;

    @Prop()
    email: string;

    @Prop({ type: mongoose.Schema.Types.Mixed, ref: 'Consents' })
    consents: Consent[];

    // @Prop({
    //     type: [{ id: { type: String }, enabled: { type: Boolean } }]
    // })
    // consents: { id: string; enabled: boolean }[];

}

const UserConsentSchema = SchemaFactory.createForClass(UserConsent);
UserConsentSchema.set('versionKey', false);
export { UserConsentSchema };