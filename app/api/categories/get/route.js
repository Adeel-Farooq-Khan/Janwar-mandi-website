import { connectToDB } from "../../../../lib/mongodb";
import Category from "../../../../models/Category";
export async function GET() {
  await connectToDB();
  const categories = await Category.find({});
  return Response.json(categories);
}
