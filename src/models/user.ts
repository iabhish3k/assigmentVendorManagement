import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
},{timestamps:true});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
