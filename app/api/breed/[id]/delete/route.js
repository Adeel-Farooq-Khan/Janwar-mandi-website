import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Breed from "../../../../models/Breed";
import { verifyToken } from '../../../../lib/verifyToken';

export async function DELETE(req, { params }) {
  try {
    await  connectToDB();
    await verifyToken(req);

    await Breed.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Breed deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
