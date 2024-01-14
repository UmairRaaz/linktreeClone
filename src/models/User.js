import mongoose, {model, Schema, models} from "mongoose";

const UserSchema = Schema({
    name: String,
    email: String,
    emailVerified : Date
});

export const User = models?.User || model('User', UserSchema)