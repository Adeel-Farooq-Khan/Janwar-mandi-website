import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb"; // ✅ CORRECT NAME
import SubCategory from "../../../../models/SubCategory";
import { verifyToken } from '../../../../lib/verifyToken';

export async function GET(req) {
  try {
    await connectToDB();
    await verifyToken(req);
    const categoryId = req.nextUrl.searchParams.get("categoryId");

    const subCategories = await SubCategory.find(
      categoryId ? { categoryId } : {}
    ).populate("categoryId", "name");

    return NextResponse.json(subCategories, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
