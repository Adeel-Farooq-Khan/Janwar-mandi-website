
import { connectToDB } from "../../../../lib/mongodb";
import Category from "../../../../models/Category";
export async function GET() {
  try {
    await connectToDB ();

    const categories = await Category.find({});
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}