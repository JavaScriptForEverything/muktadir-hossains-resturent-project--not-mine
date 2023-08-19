import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableCode: {
      type: String,
      require: [true, "Must provide a table Code"],
      trim: true,
      unique: [true, "The Table Code Must Be Unique!"],
    },
    tableCapacity: {
      type: String,
      require: [true, "Must provide a table Capacity"],
      trim: true,
    },
    isFree: {
      type: String,
      default: "free",
      enum: { values: ["free", "booked"], message: "{VALUE} is not supported" }
    },
  },
  {
    timestamps: true,
  }
);

// Create a Table Model With the schema::
const Table = mongoose.models.Table || mongoose.model("Table", tableSchema);

// Export the Table Model::
export default Table;
