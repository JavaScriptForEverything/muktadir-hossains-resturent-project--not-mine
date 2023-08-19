import mongoose, { Mongoose } from "mongoose";

const foodOrderSchema = new Mongoose.Schema(
  {
    TableCode: {
      type: String,
      require: [true, "Must Provide the TableCode"],
      trim: true,
    },
    numberOfGuest: {
      type: Number,
      required: [true, "Must Provide Number of Guest"],
      minValue: 1,
    },
    SubTotalPrice: {
      type: Number,
      required: [true, "Must Provide totalPrice"],
      minValue: 1,
    },
    discount: {
      type: Number,
      default: 0,
    },
    vat: {
      type: Number,
      default: 0,
    },
    payableAmount: {
      type: Number,
      required: [true, "Must be a Positive  Number"],
      minValue: 1,
    },
    orderItems: [
      {
        ItemName: {
          type: String,
          required: [true, "Must Provide the Food Item's Name."],
        },
        ItemCode: {
          type: String,
          required: [true, "Must Provide the Food Item's Code."],
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        foodItems: {
          type: mongoose.Schema.ObjectId,
          ref: "MenuItems",
          required: true,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Model with The order Schema ::
const Order = mongoose.models.Order || mongoose.model("Order", foodOrderSchema);
