import { connectDB } from "@/utils/db";
import Category from "@/models/Category";

export async function POST(req) {
  await connectDB();
  const { name } = await req.json();

  if (!name) return new Response("Category name required", { status: 400 });

  try {
    const category = await Category.create({ name });
    return Response.json(category);
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
