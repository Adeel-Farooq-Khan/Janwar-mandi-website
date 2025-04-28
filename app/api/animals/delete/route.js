import { NextResponse } from 'next/server';
import Animal from '../../../../models/Animal';
import { connectToDB } from "../../../../lib/mongodb";
import { verifyToken } from '../../../../lib/verifyToken';

export async function DELETE(req) {
  try {
    // 🔐 Token Verification
    verifyToken(req);

    await connectToDB();
    const { searchParams } = new URL(req.url);
    const animalId = searchParams.get('id'); // Fetch by ID

    if (!animalId) {
      return NextResponse.json({ error: 'Animal ID is required' }, { status: 400 });
    }

    const deletedAnimal = await Animal.findByIdAndDelete(animalId);

    if (!deletedAnimal) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
