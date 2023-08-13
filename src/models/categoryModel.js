import mongoose from "mongoose";

// Define the Category Schema::
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true,"Must provide a category name"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Category model using the categorySchema
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

// Export the Category model
export default Category;
