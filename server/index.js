import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoutes from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import passport from "passport";
import findOrCreate from "mongoose-findorcreate";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "./model/userModel.js";
import session from "express-session";
import { GoogleAuth } from "./controllers/auth/passport.js";

const con = mongoose.connection;
const app = express();
const PORT = process.env.PORT || 8800;

//CALLING SESSION
app.use(
    session({
        secret: "This is my very own secret",
        resave: false,
        saveUninitialized: false,
    })
);

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        // methods: "GET,POST,PATCH,DELETE",
        // credentials: true,
    })
);
//Connect with mongoDB
mongoose.connect(process.env.MONGO_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

passport.use(User.createStrategy());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use("/", usersRoutes);
// app.use("/auth", usersRoutes);

app.use(function (err, req, res, next) {
    res.status(500).send({
        message: "Request can't be processed please check details",
    });
});

con.on("open", () => {
    console.log("Connected.........");
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
