import { NextResponse } from "next/server";
import { connectToDB } from "../../../../../lib/mongodb"; // ✅ CORRECT NAME
import SubCategory from "../../../../../models/SubCategory";
import { verifyToken } from '../../../../../lib/verifyToken';

export async function DELETE(req, { params }) {
  try {
    await  connectToDB();
    await verifyToken(req);

    await SubCategory.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
