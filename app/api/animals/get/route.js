import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Animal from "../../../../models/Animal";

export async function GET() {
  try {
    await connectToDB();
    const animals = await Animal.find()
      .populate("category")
      .populate("subcategory")
      .populate("breed");
    return NextResponse.json(animals, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
