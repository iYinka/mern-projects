import mongoose from "mongoose";
const { Model, Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const reqString = {
    type: String,
    required: true,
};

const reqUniqueNumber = {
    type: Number,
    required: true,
    unique: true,
};

const bool = {
    type: Boolean,
    required: true,
    default: false,
};

const num = { type: Number };
const string = { type: String };

const contactSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: reqString,
        email: reqString,
        phoneNumber: reqUniqueNumber,
        description: string,
        isActive: bool,
    },
    { timestamps: true }
);

contactSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Contact = mongoose.model("contact", contactSchema);
export default Contact;
