import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Animal from "../../../../models/Animal";
import { verifyToken } from '../../../../lib/verifyToken';


export async function POST(req) {
  try {
    await connectToDB();
    await verifyToken(req);

    const data = await req.json();
    const animal = await Animal.create(data);

    return NextResponse.json(animal, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
