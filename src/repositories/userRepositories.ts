
import bcrypt from 'bcrypt';
import mongoose, { Model, Schema, Document } from 'mongoose';

mongoose.pluralize(null)

export interface IUser extends Document {
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    image: String,
}

const UserSchema: Schema<IUser> = new Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String,
    image: String,

}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
        }
    }
});

UserSchema.pre<IUser>("save", async function (next) {
    let user = this;
    if (this.isModified("password")) {
        try {
            let pwd = await bcrypt.hash(user.password, 10)
            user.password = pwd;
            next()
        } catch (err) {
            next(err);
        }
    } else {
        next()
    }
})


const User: Model<IUser> = mongoose.model("user", UserSchema)

export async function addUser(user: IUser): Promise<IUser> {
    let mongoUser = await User.create(user);
    return mongoUser;
}

export async function validateUser(user: Partial<IUser>): Promise<IUser | Boolean> {
    let mongoUser = await User.findOne({ email: user.email });
    if (mongoUser != null) {
        let isValid = await bcrypt.compare(user.password, mongoUser.password.toString());
        if (isValid) {
            return mongoUser;
        }
        return false;
    }
    return false;
}

export async function getUser(user: Partial<IUser>): Promise<IUser | null> {
    let mongoUser = await User.findOne({ email: user.email });
    if (mongoUser != null) {
        return mongoUser;
    }
    return null;
}

export async function updateImage(user:IUser, image: string): Promise<IUser | null> {
    let mongoUser = await User.findOne({ email: user.email });
    if (mongoUser != null) {
        mongoUser.image = image;
        return await mongoUser.save();
    }
    return null;
}