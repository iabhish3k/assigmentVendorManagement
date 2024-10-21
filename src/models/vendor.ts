import mongoose from 'mongoose';

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a vendor name'],
    },
    type: {
        type: String,
        required: [true, 'Please provide a vendor type'],
    },
    criticality: {
        type: String,
        required: [true, 'Please provide the criticality'],
        enum: ['High', 'Medium', 'Critical', 'Low'],
    },
    status: {
        type: String,
        required: [true, 'Please provide the vendor status'],
        enum: ['Active', 'UnderReview', 'Inactive', 'Pending'],
    },
    contact: {
        type: String,
        required: [true, 'Please provide a contact email'],
    },
}, { timestamps: true });

const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
export default Vendor;
