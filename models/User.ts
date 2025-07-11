import mongoose, { model, models, Schema } from 'mongoose';
import bcrypt from "bcryptjs";

export interface User {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema <User>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    // _id: mongoose.Types.ObjectId,
    },
    {
        timestamps: true,
    },
)

userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }   next();
});


const User = models?.User || model<User>("User", userSchema);

export default User;