import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Breed from "../../../../models/Breed";
import { verifyToken } from '../../../../lib/verifyToken';

export async function POST(req) {
  try {
    await  connectToDB();
    await verifyToken(req);

    const { name, subCategory } = await req.json();

    const newBreed = await Breed.create({ name, subCategory });
    return NextResponse.json(newBreed, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
