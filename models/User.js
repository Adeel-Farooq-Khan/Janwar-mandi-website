// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// ✅ Prevent model overwrite error in development
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
