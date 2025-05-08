import { NextResponse } from "next/server";
import { connectToDB } from "../../../../../lib/mongodb";
import Animal from "../../../../../models/Animal";
import { verifyToken } from '../../../../../lib/verifyToken';
import mongoose from 'mongoose';

export async function PUT(request, { params }) {
  try {
    // Connect to database
    await connectToDB();
    console.log('Database connected successfully');
    
    // Get ID from params object properly
    const { id } = params;
    console.log('Animal ID from URL:', id);
    
    // Verify token
    try {
      await verifyToken(request);
      console.log('Token verification successful');
    } catch (authErr) {
      console.error('Authentication error:', authErr.message);
      return NextResponse.json({ error: 'Authentication failed: ' + authErr.message }, { status: 401 });
    }

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid animal ID format');
      return NextResponse.json({ error: 'Invalid animal ID format' }, { status: 400 });
    }

    // Parse request body
    const body = await request.json();
    console.log('Update data received:', body);
    
    // Check if animal exists first
    const existingAnimal = await Animal.findById(id);
    if (!existingAnimal) {
      console.error(`Animal with ID ${id} not found in database`);
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }
    console.log('Found existing animal:', existingAnimal);

    // Perform update
    const updatedAnimal = await Animal.findByIdAndUpdate(
      id, 
      body, 
      { new: true, runValidators: true }
    );
    
    console.log('Update successful, new document:', updatedAnimal);
    return NextResponse.json(updatedAnimal, { status: 200 });
  } catch (err) {
    console.error('Update operation failed with error:', err);
    return NextResponse.json({ 
      error: err.message, 
      code: err.code || 'UNKNOWN',
      name: err.name || 'UnknownError'
    }, { status: 500 });
  }
}
