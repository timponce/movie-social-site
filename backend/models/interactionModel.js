import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const interactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    film: {
      type: Number,
      required: true,
    },
    watched: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
      maxLength: 400,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interaction", interactionSchema);
