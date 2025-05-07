
import { connectToDB } from "../../../../lib/mongodb";
import Category from '../../../../models/Category';
import { verifyToken } from '../../../../lib/verifyToken';
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    // 🔐 Authenticate the request
    const user = await verifyToken(req);
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    await Category.findByIdAndDelete(id);
    return new NextResponse("Category deleted", { status: 200 });

  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
