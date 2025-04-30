import { connectDB } from "@/utils/db";
import Category from "@/models/Category";

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    await Category.findByIdAndDelete(id);
    return new Response("Category deleted", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
