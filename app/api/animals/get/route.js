import { NextResponse } from 'next/server';
import Animal from '../../../../models/Animal';
import { connectToDB } from "../../../../lib/mongodb";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const animalId = searchParams.get('id'); // If specific animal ID is passed

    let animals;
    if (animalId) {
      animals = await Animal.findById(animalId);
    } else {
      animals = await Animal.find(); // Get all animals
    }

    if (!animals) {
      return NextResponse.json({ error: 'No animals found' }, { status: 404 });
    }

    return NextResponse.json({ animals });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
