import User from "../models/User.js";
import { hash, compare } from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    try {
        //get all users from the database
        const users = await User.find();
        return res.status(200).json({ message: "Ok", data: users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Ok", cause: error.message });
    }
};
//user signup
export const userSignup = async (req, res, next) => {
    try {
        //user sign up
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "Ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Ok", cause: error.message });
    }
};
//user login
export const userLogin = async (req, res, next) => {
    try {
        //user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not registered" });
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(403).json({ message: "Incorrect password" });
        return res.status(201).json({ message: "Ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Ok", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map