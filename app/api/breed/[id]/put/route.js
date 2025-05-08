import { NextResponse } from "next/server";
import { connectToDB } from "../../../../../lib/mongodb";
import Breed from "../../../../../models/Breed";
import { verifyToken } from '../../../../../lib/verifyToken';

export async function PUT(req, { params }) {
  try {
    await  connectToDB();
    await verifyToken(req);

    const data = await req.json();
    const updated = await Breed.findByIdAndUpdate(params.id, data, { new: true });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
