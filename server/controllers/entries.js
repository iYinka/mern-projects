import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

import User from "../model/userModel.js";
import Contact from "../model/contactModel.js";

import dotenv from "dotenv";
dotenv.config();

let occupations = [{ id: 1, name: "Actor", id: 2, named: "Engineer" }];

// RETRIEVE ALL ENTRIES
export const getAllContacts = async (req, res) => {
    // GET all entry details by user
    const contacts = await Contact.find({ user: req.user.id });

    res.json(contacts);
};

//RETRIEVE ENTRY BY ID
export const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.user.id, req.body);

        if (!contact) {
            res.status(404).send({
                message: `No entry with id: ${req.params.id} found`,
            });
        } else {
            res.send(contact);
        }
    } catch (err) {
        res.status(500).send({
            message: `Error retrieving entry with id: ${req.params.id}`,
        });
    }
};

// CREATE AND SAVE ENTRY
export const createContact = async (req, res) => {
    // Validate
    if (!req.body) {
        res.status(400).send({ message: "Field can not be empty" });
    }

    // new ENTRY
    const contact = new Contact({
        user: req.user.id,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        description: req.body.description,
        isActive: req.body.isActive,
    });

    try {
        //Check if the user already exists in the db
        // console.log("req.user.id", req.user.id);

        const contactExists = await Contact.findOne({
            user: req.user.id,
            phoneNumber: req.body.phoneNumber,
        });

        if (contactExists) {
            return res
                .status(400)
                .send({ msg: "Contact's phone number exists" });
        } else {
            const new_contact = await contact.save();
            const _contact = await Contact.find();

            _contact.push({ ...new_contact });
            res.status(201).json({
                success: true,
                new_contact,
                message: "Entry successfully created",
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

// UPDATE ENTRY
export const updateContact = async (req, res) => {
    try {
        if (!req.body) {
            return res
                .status(400)
                .send({ message: "Entry to update can not be empty" });
        }

        const { name, email, phoneNumber, occupation, description, isActive } =
            req.body;

        const user = await User.findById(req.user.id);

        // Check if user is logged in
        if (!user) {
            res.status(401);
            throw new Error("User not found!");
        }

        // Update entry details
        const contact = await Contact.findByIdAndUpdate(req.params.id);

        // Ensure logged in user created entry
        if (contact.user.toString() !== user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }

        if (user) contact.user = user.id;
        if (name) contact.name = name;
        if (email) contact.email = email;
        if (phoneNumber) contact.phoneNumber = phoneNumber;
        if (occupation) contact.occupation = occupation;
        if (isActive) contact.isActive = isActive;
        if (description) contact.description = description;

        const updatedContact = await contact.save();
        if (!updatedContact) {
            res.status(404).send({
                message: `Can not update entry with ${id}. Maybe entry not found!`,
            });
        } else {
            res.status(201).json({
                success: true,
                updatedContact,
                message: "Contact successfully updated",
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

// DELETE ENTRY BY ID
export const deleteContact = async (req, res) => {
    console.log(`fffff`, req.user.id);

    try {
        const user = await User.findById(req.user.id);
        // Check if user is logged in
        if (!user) {
            res.status(401);
            throw new Error("User not found!");
        }

        const contact = await Contact.findById(req.params.id);
        // Check if entry exists
        if (!contact) {
            res.status(400);
            throw new Error("Entry not found");
        }
        // Ensure logged in user created entry
        if (contact.user.toString() !== user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }

        const deletedContact = await contact.remove();
        if (!deletedContact) {
            res.status(404).send({
                message: `Can not delete entry. Maybe contact not found!`,
            });
        } else {
            res.status(201).json({
                success: true,
                message: `Entry with ID: ${deletedContact.id} deleted successfully`,
            });
        }
    } catch (err) {
        res.status(404).send({
            message: `Can not delete entry}. Maybe contact not found!`,
        });
    }
};

export const getOccupations = (req, res) => {
    console.log(occupations);
    res.send(occupations);
};
