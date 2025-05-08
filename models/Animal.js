import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
  breed: { type: mongoose.Schema.Types.ObjectId, ref: "Breed", required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String }], // Array of URLs
  teeth: { type: Number },
  teats: { type: Number },
  pregnancyMonth: { type: Number },
  lactation: { type: Boolean },
  userDetails: {
    username: String,
    phone: String,
    location: {
      province: String,
      tehsil: String,
      district: String,
    }
  }
}, { timestamps: true });

export default mongoose.models.Animal || mongoose.model("Animal", animalSchema);
