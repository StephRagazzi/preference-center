import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from "mongoose";

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
export class UserConsent extends Document {
    @Prop()
    id: string;

    @Prop({
        type: String, validate: {
            validator: async (email) => {
                const emailCount = await mongoose.models.UserConsent.countDocuments({ email });
                return !emailCount;
            },
            message: 'The e-mail address already exists!'
        }
    })
    email: string;

    @Prop({ type: mongoose.Schema.Types.Mixed, ref: 'Consents' })
    consents: Consent[];
}

const UserConsentSchema = SchemaFactory.createForClass(UserConsent);
UserConsentSchema.set('versionKey', false);
UserConsentSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    return obj;
}
export { UserConsentSchema };