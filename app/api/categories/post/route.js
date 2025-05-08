import { NextResponse } from 'next/server';
import { connectToDB } from "../../../../lib/mongodb";
import Category from "../../../../models/Category";
import { verifyToken } from '../../../../lib/verifyToken';

export async function POST(req) {
  try {
    await connectToDB ();
    await verifyToken(req);

    const { name } = await req.json();
    const newCategory = await Category.create({ name });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}