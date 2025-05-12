import { NextResponse } from "next/server";
import { connectToDB } from "../../../../../lib/mongodb";
import SubCategory from "../../../../../models/SubCategory";
import { verifyToken } from '../../../../../lib/verifyToken';
import mongoose from 'mongoose';

// Define the route handler
export async function PUT(request, { params }) {
  try {
    // Connect to database
    await connectToDB();
    console.log('Database connected successfully');
    
    // In Next.js App Router, we get id directly without awaiting
    const { id } = params; // Destructuring properly from params object
    console.log('Subcategory ID from URL:', id);
    
    // Verify token
    try {
      await verifyToken(request);
      console.log('Token verification successful');
    } catch (authErr) {
      console.error('Authentication error:', authErr.message);
      return NextResponse.json({ error: 'Authentication failed: ' + authErr.message }, { status: 401 });
    }

    // Validate the ID format before proceeding
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid subcategory ID format');
      return NextResponse.json({ error: 'Invalid subcategory ID format' }, { status: 400 });
    }

    // Parse the request body
    const data = await request.json();
    console.log('Update data received:', data);
    
    // Check for empty update
    if (Object.keys(data).length === 0) {
      console.error('No update data provided');
      return NextResponse.json({ error: 'No update data provided' }, { status: 400 });
    }
    
    // If categoryId is being updated, validate its format
    if (data.categoryId && !mongoose.Types.ObjectId.isValid(data.categoryId)) {
      console.error('Invalid categoryId format:', data.categoryId);
      return NextResponse.json({ error: 'Invalid category ID format' }, { status: 400 });
    }

    // First check if the subcategory exists
    const existingSubCategory = await SubCategory.findById(id);
    if (!existingSubCategory) {
      console.error(`Subcategory with ID ${id} not found in database`);
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }
    console.log('Found existing subcategory:', existingSubCategory);

    // Perform update with runValidators to ensure data integrity
    const updated = await SubCategory.findByIdAndUpdate(
      id, 
      data, 
      { new: true, runValidators: true }
    );
    
    console.log('Update successful, new document:', updated);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error('Update operation failed with error:', err);
    return NextResponse.json({ 
      error: err.message, 
      code: err.code || 'UNKNOWN',
      name: err.name || 'UnknownError',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { status: 500 });
  }
}
