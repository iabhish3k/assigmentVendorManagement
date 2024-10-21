import dbConnect from '@/lib/dbConnection';
import Vendor from '@/models/vendor';
import { NextResponse } from 'next/server';
// Adjust the import based on your model file

// Named export for the GET method
export async function GET() {
  try {
    await dbConnect(); // Ensure you connect to the database

    const vendors = await Vendor.find(); // Fetch all vendors
    return NextResponse.json(vendors); // Return vendors in JSON format
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
  }
}
// POST method to create a new vendor
export async function POST(request: Request) {
  try {
    await dbConnect(); // Connect to the database

    const { name, type, criticality, status, contact } = await request.json(); // Parse JSON body

    const newVendor = new Vendor({ name, type, criticality, status, contact });
    await newVendor.save(); // Save the new vendor

    return NextResponse.json(newVendor, { status: 201 }); // Return the created vendor
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json({ error: 'Failed to create vendor' }, { status: 400 });
  }
}