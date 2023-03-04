import jwt from "jsonwebtoken";
import Contact from "../model/contactModel.js";
import User from "../model/userModel.js";
export const privacy = (req, res, next) => {
    const { authorization } = req.headers;
       const  token = authorization.split(" ")[1];

    console.log(`authorization,`, token);

    //authorization === Bearer ewefwegwrherhe
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded)
        return res
            .status(406)
            .json({ err: "Token not verified, authorization denied" });

    // Get user from the token
    req.user = User.findById(decoded.id).select("-password");
    req.user.id = decoded.id;

    next();
}

// export const privacy = async (req, res, next) => {
//     // let token;

//     // if (
//     //     req.headers.authorization ||
//     //     req.headers.authorization.startsWith("Bearer")
//     // ) {
//     //     try {
//     //         // Get token from header
//     // token = req.headers.authorization.split(" ")[1];
//     // console.log(`token: ${token}`);

//     // Verify token
//     const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
//     if (!decoded)
//         return res
//             .status(406)
//             .json({ err: "Token not verified, authorization denied" });

//     // Get user from the token
//     req.user = await User.findById(decoded.id).select("-password");
//     // req.user.id = decoded.id;
//     // console.log(req.user);

//     next();
//     // } catch (error) {
//     //     console.log(error);
//     //     res.status(401);
//     //     throw new Error("Not authorized, access denied!");
//     // }
//     // }
//     if (!token) {
//         res.status(401);
//         throw new Error("Not authorized, no token");
//     }
// };
