import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.ObjectId,
      ref: "Products",
    },
  ],
  // payment: {
  //   method: String, // Payment method (e.g., "Cash on Delivery")
  //   status: String,
  //   // Payment status (e.g., "Pending", "Completed")
  //   // Other payment-related fields
  // },

  payment: {
    type: {
      method: String, // Payment method (e.g., "Cash on Delivery")
      status: String,
    },
    default: {
      status: "pending",
    },
  },
  // buyer: {
  //   _id: {
  //     type: mongoose.ObjectId,
  //     ref: "users",
  //   },
  //   name: String, // Add the buyer's name
  // },
  buyer: {
    type: mongoose.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    default: "Not Process",
    enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
  },
});

export default mongoose.model("Order", orderSchema);
