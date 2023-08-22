import mongoose from "mongoose";

// Create Configuration Schema ::
const ConfigurationSchema = new mongoose.Schema(
  {
    vatPercentage: {
      type: Number,
      default: 0,
    },
    discount: {
      value: {
        type: Number,
        default: 0,
      },
      type: {
        type: String,
        enum: ['percentage', 'fixed'],
        default: 'percentage',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create a Model with The Configuration Schema ::
const Configuration =
  mongoose.models.Configuration ||
  mongoose.model("Configuration", ConfigurationSchema);

export default Configuration;
