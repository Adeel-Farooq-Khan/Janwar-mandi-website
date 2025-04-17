// app/api/auth/register/route.js
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { connectToDB } from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    const { username, email, password, confirmPassword } = await req.json();
    console.log({email});

    // ✅ Check for missing fields
    if (!username || !email || !password || !confirmPassword) {
      return new Response(
        JSON.stringify({ error: "Please fill all fields" }),
        { status: 400 }
      );
    }

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
      return new Response(
        JSON.stringify({ error: "Passwords do not match" }),
        { status: 400 }
      );
    }

    await connectToDB();

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({ message: "User registered", userId: newUser._id }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Something went wrong" }),
      { status: 500 }
    );
  }
}
