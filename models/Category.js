import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Dairy', 'Meat', 'Qurbani'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
