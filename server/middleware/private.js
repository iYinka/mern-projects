import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const privacy = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select("-password");

            // console.log(req.user);
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, access denied!");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};
