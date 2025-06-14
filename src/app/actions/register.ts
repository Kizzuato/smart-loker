"use server"

import dbConnect from "@/lib/mongodb";
import { User } from "../models/user";
import bcrypt from "bcryptjs";export const register = async (values: any) => {
    const { email, password, name } = values;

    try {
        await dbConnect();
        const userFound = await User.findOne({ email });
        if(userFound){
            return {
                error: 'Email already exists!'
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        const savedUser = await user.save();

    }catch(e){
        console.log(e);
    }
}