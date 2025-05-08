import { NextResponse } from "next/server";
import { connectToDB } from "../../../../../lib/mongodb";
import Animal from "../../../../../models/Animal";
import { verifyToken } from "../../../../../lib/verifyToken";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    await verifyToken(req);

    await Animal.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Animal deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
