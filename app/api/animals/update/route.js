import { NextResponse } from 'next/server';
import Animal from '../../../../models/Animal';
import { connectToDB } from "../../../../lib/mongodb";
import { verifyToken } from '../../../../lib/verifyToken';

export async function PATCH(req) {
  try {
    // 🔐 Token Verification
    verifyToken(req);

    await connectToDB();
    const { searchParams } = new URL(req.url);
    const animalId = searchParams.get('id'); // Fetch by ID

    if (!animalId) {
      return NextResponse.json({ error: 'Animal ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const updatedAnimal = await Animal.findByIdAndUpdate(animalId, body, { new: true });

    if (!updatedAnimal) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Animal updated successfully', animal: updatedAnimal });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
