import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnection";
import Vendor from "@/models/vendor";

export async function GET() {
  try {
    await dbConnect(); // Ensure you connect to the database

    // Aggregation pipeline to get counts for vendor types, statuses, and criticalities
    const [result, vendorList] = await Promise.all([
      Vendor.aggregate([
        {
          $facet: {
            vendorTypeData: [
              { $group: { _id: "$type", count: { $sum: 1 } } },
              { $project: { name: "$_id", value: "$count", _id: 0 } }
            ],
            statusData: [
              { $group: { _id: "$status", count: { $sum: 1 } } },
              { $project: { name: "$_id", value: "$count", _id: 0 } }
            ],
            criticalityData: [
              { $group: { _id: "$criticality", count: { $sum: 1 } } },
              { $project: { name: "$_id", value: "$count", _id: 0 } }
            ],
          }
        }
      ]),
      Vendor.find().select('-__v') // Fetch all vendors excluding the __v field
    ]);

    // The result will contain the counts in a single object
    const { vendorTypeData, statusData, criticalityData } = result[0];

    // Return response with the counts and the vendor list
    return NextResponse.json({ vendorTypeData, statusData, criticalityData, vendorList });
  } catch (error) {
    console.error('Error fetching vendor counts and list:', error);
    return NextResponse.json({ error: 'Failed to fetch vendor counts and list' }, { status: 500 });
  }
}
