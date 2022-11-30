import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoutes from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

//Connect with mongoDB
mongoose.connect(process.env.MONGO_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const con = mongoose.connection;
const app = express();
const PORT = process.env.PORT || 8800;

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.set("view engine", "ejs");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use("/", usersRoutes);

// app.get("*", (req, res)=>{
//     res.render("404
//         ", {title: "404 page"})
// })

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send({ message: "Error oooooooo" });
});

// //CALLING SESSION
// app.use(
//     session({
//         secret: "This is my very own secret",
//         resave: false,
//         saveUninitialized: false,
//     })
// );

// //PASSPORT
// app.use(passport.initialize());
// app.use(passport.session());

// //FOR THE HASHING AND CRYPTING
// userSchema.plugin(passportLocalMongoose);

// //ENCRYPTION package added as a plugin
// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

con.on("open", () => {
    console.log("Connected.........");
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
