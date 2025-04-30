import { NextResponse } from 'next/server';
import  Animal from '../../../../models/Animal';
import { connectToDB } from "../../../../lib/mongodb"; // ✅ CORRECT NAME
import { verifyToken } from '../../../../lib/verifyToken';


export async function POST(req) {
    try {
        // 🔐 Token Verification
      verifyToken(req);
    await connectToDB(); // ✅ matches your function name

    const body = await req.json();

    const {
      category,       // Dairy | Meat | Qurbani
      subcategory,    // Cow, Bull, etc.
      breed,
      age,
      weight,
      gender,
      price,
      description,
      images,         // array of image URLs
      teeth,
      teats,
      pregnancyMonth,
      lactation,
      userDetails     // name, contact, location { province, district, tehsil }
    } = body;

    // ✅ Save to database using Mongoose model
    const animal = await Animal.create({
      category,
      subcategory,
      breed,
      age,
      weight,
      gender,
      price,
      description,
      images,
      teeth,
      teats,
      pregnancyMonth,
      lactation,
      userDetails
    });

    return NextResponse.json({ message: 'Animal listing created successfully', animal }, { status: 201 });
  } catch (error) {
    // Handle error (if token is invalid or missing)
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
