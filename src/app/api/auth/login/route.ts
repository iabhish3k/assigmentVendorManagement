import { NextResponse } from "next/server";
import User from "@/models/User"; // Adjust according to your project structure
import bcrypt from "bcrypt"; // Ensure you have bcrypt installed
import jwt from "jsonwebtoken"; // Ensure you have jsonwebtoken installed
import dbConnect from "@/lib/dbConnection";

// Named export for the POST method
export async function POST(req: Request) {
    const { email, password } = await req.json();

    try {
        await dbConnect(); // Ensure to connect to your MongoDB
console.log("----------------------------------------------------------------------------")
        // Find the user by email
        const userData = await User.findOne({ email,  password});
        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Compare passwords
        // const isMatch = await bcrypt.compare(password, userData.password);
        // if (!isMatch) {
        //     return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        // }

        // Generate a token (you may want to customize the payload)
        const token = jwt.sign(
            { id: userData._id, email: userData.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return NextResponse.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "An error occurred during login" },
            { status: 500 }
        );
    }
}
