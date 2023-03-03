import express from "express";
import passport from "passport";
import {
    deleteUser,
    errorHandler,
    loginUser,
    registerUser,
} from "../controllers/auth/auth.js";
import {
    createContact,
    deleteContact,
    getAllContacts,
    getContact,
    getOccupations,
    updateContact,
} from "../controllers/entries.js";
import { privacy } from "../middleware/private.js";
import User from "../model/userModel.js";

const router = express.Router();

// PASSPORT ROUTES
// router.get("/contacts", (req, res) => {
//     if (req.user) {
//         res.status(200).json({
//             error: false,
//             message: "Successfully logged in",
//             user: req.user,
//         });
//     } else {
//         res.status(403).json({ error: true, message: "Not Authorized!" });
//     }
// });
// router.get("/", (req, res) => {
//     res.status(401).json({ error: true, message: "Log in failure" });
// });
// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         successRedirect: process.env.CLIENT_URL,
//         failureRedirect: "/",
//     })
// );
// router.get("/google", passport.authenticate("google", ["profile", "email"]));
// router.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect(process.env.CLIENT_URL);
// });
// GOOGLE ROUTES ends

// AUTH ROUTES
router.post("/register_user", errorHandler(registerUser));
router.post("/login_user", errorHandler(loginUser));
router.delete("/delete_user", privacy, errorHandler(deleteUser));


// CONTACTS ROUTES
router.get("/contacts/", privacy, getAllContacts);
router.get("/contacts/:id", privacy, getContact);
router.post("/contacts/create", privacy, createContact);
router.patch("/contacts/update/:id", privacy, updateContact);
router.delete("/contacts/delete/:id", privacy, deleteContact);

// To Get occupations
router.get("/occupations", getOccupations);

export default router;
