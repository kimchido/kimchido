import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },

  address: {
    type: String,
    maxlenght: 100,
  },
  shopType: {
    type: String,
  },
  lng: {
    type: Number,
  },

  lat: {
    type: Number,
  },

  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export default mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
