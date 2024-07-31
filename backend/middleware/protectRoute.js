import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        //cannot use until place app.use(cookieparser) in server
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({error: "Unauthoried - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({error: "Unauthoried - Invalid Token"});
        }
        //we assign userId in genenrate token file so we place it here
        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        req.user = user;

        //next will invoke sendMessage after validate message.routes.js with protect routes which is sendMessage
        next();
    }

    catch (error) {
        console.log("Error in protectRoute middleware: ", error.message)
        res.status(500).json({error: "Internal Server Error"});
    }
};

export default protectRoute;