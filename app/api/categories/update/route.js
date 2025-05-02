import { connectDB } from "@/utils/db";
import Category from "./../../../../models/Category";

export async function PUT(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = await req.json();

  try {
    const updated = await Category.findByIdAndUpdate(id, data, { new: true });
    return Response.json(updated);
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
