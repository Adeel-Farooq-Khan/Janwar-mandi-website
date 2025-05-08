
import { connectToDB } from "../../../../lib/mongodb";
import Category from '../../../../models/Category';
import { verifyToken } from '../../../../lib/verifyToken';
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    await verifyToken(req);

    await Category.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}