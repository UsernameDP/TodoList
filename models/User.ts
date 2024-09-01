import mongoose from "mongoose";

export interface UserDB extends mongoose.Document, User {}

const UserSchema = new mongoose.Schema<UserDB>({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    unique: true // Ensures that the username is unique
  },
  password: {
    type: String,
    required: [true, "Please provide a password."]
  }
});

export default mongoose.models.User ||
  mongoose.model<UserDB>("User", UserSchema);
