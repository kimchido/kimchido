import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
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
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
