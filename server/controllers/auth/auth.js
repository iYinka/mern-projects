import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../model/userModel.js";
import { loginSchema, registerSchema } from "../validationSchema.js";
import dotenv from "dotenv";
dotenv.config();
// import { Strategy as FacebookStrategy } from "passport-facebook";
// import { GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import findOrCreate from "mongoose-findorcreate";

// http://127.0.0.1:3000/auth/google/my_contacts

// ERROR HANDLER
export const errorHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// REGISTRATION

// FOR HASHING AND SALTING
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = registerSchema.validate(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });

    //Check if the user already exists in the db
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.json({ msg: "Email already exists" });

    // Creating with passport
    // const newUser = new User({
    //     name: name,
    //     email: email,
    //     password: hash,
    // });

    // User.register({ username: email }, password, function (err, user) {
    //     if (err) {
    //         console.log(err);
    //         res.redirect("/register");
    //     } else {
    //         passport.authenticate("local")(req, res, function () {
    //             res.redirect("/secrets");
    //         });
    //     }
    // });

    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
        name: name,
        email: email,
        password: hash,
    });

    try {
        const savedUser = await newUser.save();
        if (savedUser) {
            res.status(201).json({
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email,
                password: savedUser.password,
                accessToken: generateToken(savedUser.id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
        // res.send(savedUser);
    } catch (err) {
        console.log(err);
    }
};

export const loginUser = async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    // Validate if user exist in our database
    const user = await User.findOne({
        email: email,
    });
    if (user) {
        const validPass = await bcrypt.compare(password, user.password);

        if (validPass) {
            res.status(201).json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    date: user.date,
                    accessToken: generateToken(user.id),
                },
                message: "Login successful",
            });
        } else {
            return res
                .status(401)
                .send({ status: "Fail", message: "Unauthorized user" });
        }
    } else {
        return res
            .status(404)
            .send({ status: "Fail", message: "User not found" });
    }
};

// DELETE USER BY ID
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ status: "Success", message: "User deleted" });
    } catch (err) {
        res.status(500).json({
            err: err.message || `Can not delete user . Maybe user not found!`,
        });
    }
};

// Generate TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
    });
};
