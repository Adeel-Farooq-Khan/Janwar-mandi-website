// models/Animal.js
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  province: { type: String, required: true },
  district: { type: String, required: true },
  tehsil: { type: String, required: true },
}, { _id: false });

const UserDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: LocationSchema, required: true },
}, { _id: false });

const AnimalSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Dairy', 'Meat', 'Qurbani'],
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
    validate: [arr => arr.length <= 5, '{PATH} exceeds the limit of 5'],
  },
  teeth: {
    type: String,
    enum: ['Kheeri', '2', '4', '6', '8'],
  },
  teats: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  pregnancyMonth: {
    type: String,
    enum: ['1 to 3 Months', '3 to 6 Months', '6 to 9 Months', 'N/A'],
  },
  lactation: {
    type: Number,
    min: 1,
    max: 10,
  },
  userDetails: {
    type: UserDetailsSchema,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Animal || mongoose.model('Animal', AnimalSchema);
