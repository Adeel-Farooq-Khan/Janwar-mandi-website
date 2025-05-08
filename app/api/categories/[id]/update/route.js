
import { NextResponse } from 'next/server';
import { connectToDB } from "../../../../../lib/mongodb";
import Category from '../../../../../models/Category';
import { verifyToken } from '../../../../../lib/verifyToken';

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    await verifyToken(req);

    const data = await req.json();
    const updated = await Category.findByIdAndUpdate(params.id, data, { new: true });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}