import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Breed from "../../../../models/Breed";

export async function GET() {
  try {
    await  connectToDB();

    const breeds = await Breed.find().populate("subCategory");
    return NextResponse.json(breeds, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
