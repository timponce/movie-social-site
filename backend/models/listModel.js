import mongoose from "mongoose";

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    listName: {
      type: String,
      required: [true, "Please add a list name"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("List", listSchema);
