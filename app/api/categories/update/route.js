import { NextResponse } from 'next/server';
import { connectToDB } from "../../../../lib/mongodb";
import Category from '../../../../models/Category';
import { verifyToken } from '../../../../lib/verifyToken';

export async function PUT(req) {
  try {
    // 🔐 Verify token
    const user = await verifyToken(req);
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const data = await req.json();

    if (!id) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!data.name) {
      return new NextResponse("Category name is required", { status: 400 });
    }

    const updated = await Category.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return new NextResponse("Category not found", { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
