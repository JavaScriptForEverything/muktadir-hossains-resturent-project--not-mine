import mongoose from "mongoose";

// Create Configuration Schema ::
const ConfigurationSchema = new mongoose.Schema(
  {
    vat: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// discount: {
//   type: Number,
//   default: 0,
// },

// Create a Model with The Configuration Schema ::
const Configuration = mongoose.models.Configuration || mongoose.model("Configuration", ConfigurationSchema);

export default Configuration;
