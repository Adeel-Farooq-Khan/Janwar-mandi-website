// app/api/auth/login/route.js
export const runtime = "nodejs";

import User from "../../../../models/User";
import { connectToDB } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
     console.log({email});
    // ✅ Field presence check

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Please fill all fields" }),
        { status: 400 }
      );
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400 }
      );
    }

    // ✅ Password length validation
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 6 characters" }),
        { status: 400 }
      );
    }

    await connectToDB();

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // ✅ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // ✅ Sign JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    return new Response(
      JSON.stringify({
        token,
        user: { email: user.email, username: user.username },
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500 }
    );
  }
}
