import mongoose, { Model, Schema } from "mongoose";
import UserInterface from "../interfaces/userInterface";

// Define the User Schema
const userSchema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now
  }
});

// Create the User model
const User = mongoose.model<UserInterface>("User", userSchema);

// Export the User model
export default User;
