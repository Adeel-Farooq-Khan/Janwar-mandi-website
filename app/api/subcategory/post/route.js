import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb"; // ✅ CORRECT NAME
import SubCategory from "../../../../models/SubCategory";
import { verifyToken } from '../../../../lib/verifyToken';


export async function POST(req) {
  try {
    await connectToDB();
    await verifyToken(req);

    const { name, categoryId } = await req.json();
    const newSub = await SubCategory.create({ name, categoryId });

    return NextResponse.json(newSub, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
