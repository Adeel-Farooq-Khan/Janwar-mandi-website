import { NextResponse } from 'next/server';
import { connectToDB } from "../../../../lib/mongodb";
import Category from "../../../../models/Category";
import { verifyToken } from '../../../../lib/verifyToken';

export async function POST(req) {
  try {
    verifyToken(req);
    await connectToDB();
    
    const { name } = await req.json();
    if (!name) {
      return new NextResponse("Category name is required", { status: 400 });
    }

    const category = await Category.create({ name });
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
