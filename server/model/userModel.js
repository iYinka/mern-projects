import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
import passport from "passport";
const { Model, Schema } = mongoose;

const reqString = {
    type: String,
    required: "Please enter a value",
};

const reqUniqueString = {
    type: String,
    required: "Please enter an email address",

    unique: true,
    trim: true,
    lowercase: true,
};

const userSchema = new Schema(
    {
        name: reqString,
        email: reqUniqueString,
        password: reqString,
        googleId: String,
        facebookId: String,
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

//PLUGINs
userSchema.plugin(passportLocalMongoose); //FOR THE HASHING AND CRYPTING
userSchema.plugin(findOrCreate);

const User = mongoose.model("user", userSchema);
passport.use(User.createStrategy());

export default User;
