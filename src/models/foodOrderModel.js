import mongoose from "mongoose";
import MenuItems from "./menuItemsModel";

const foodOrderSchema = new mongoose.Schema(
  {
    orderType:{
      type: String,
      lowercase: true,
      default:"by restaurant",
      enum: {
        values: ["by restaurant", "by customer", "by waiter"],
        message: "{VALUE} is not supported !",
      },
    },
    orderStatus:{
      type: String,
      lowercase: true,
      default:"pending",
      enum: {
        values: ["pending", "preparing", "served","canceled","paid"],
        message: "{VALUE} is not supported !",
      },
    },
    tableCode: {
      type: String,
      trim: true,
    },
    numberOfGuest: {
      type: Number,
      required: [true, "Must Provide Number of Guest"],
      default: 1,
      minValue: 1,
    },
    subTotalPrice: {
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
        title: {
          type: String,
          required: [true, "Must Provide the Food Item's Name."],
        },
        itemCode: {
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
        foodItemUID: {
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

// pre-save middleware
foodOrderSchema.pre("save", async function (next) {
  try {
    const MenuItem = mongoose.models.MenuItems;

    for (const orderItem of this.orderItems) {
      const menuItem = await MenuItem.findOne({
        _id: orderItem.foodItemUID,
        price: orderItem.price,
        title: orderItem.title,
        itemCode: orderItem.itemCode,
      });

      if (!menuItem) {
        let errorMessage = `Food item with ID "${orderItem.foodItemUID}" not found.`;

        if (menuItem && menuItem.price !== orderItem.price) {
          errorMessage = `Food item with ID "${orderItem.foodItemUID}" found, but the price doesn't match.`;
        } else if (menuItem && menuItem.title !== orderItem.title) {
          errorMessage = `Food item with ID "${orderItem.foodItemUID}" found, but the title doesn't match.`;
        } else if (menuItem && menuItem.itemCode !== orderItem.itemCode) {
          errorMessage = `Food item with ID "${orderItem.foodItemUID}" found, but the itemCode doesn't match.`;
        }

        throw new Error(errorMessage);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});



// Create a Model with The order Schema ::
const Order = mongoose.models.Order || mongoose.model("Order", foodOrderSchema);

export default Order;
