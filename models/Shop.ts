import mongoose, { Schema, Document } from "mongoose";
// import { IReview } from "./Review";
import { IUser } from "./User";

export interface IShop extends Document {
  shopId: number;
  name: string;
  address: string;
  shopType: string;
  lng: number;
  lat: number;
  reviews: Array<IReview>;
}

export interface IReview extends Document {
  reviewerId: IUser["_id"];
  kimchiType: string;
  spicyness: number;
  sourness: number;
  texture: number;
  sweetness: number;
  rating: number;
}

const ShopSchema: Schema = new mongoose.Schema({
  shopId: {
    type: String,
    required: true,
    maxlength: 100,
  },

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

  //   reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],

  reviews: [
    {
      reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      kimchiType: {
        type: String,
        maxlength: 40,
      },

      spicyness: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
          validator: Number.isInteger,
        },
      },

      sourness: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
          validator: Number.isInteger,
        },
      },

      texture: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
          validator: Number.isInteger,
        },
      },

      sweetness: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
          validator: Number.isInteger,
        },
      },

      rating: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
          validator: Number.isInteger,
        },
      },
    },
  ],
});

export default mongoose.models.Shop ||
  mongoose.model<IShop>("Shop", ShopSchema);
