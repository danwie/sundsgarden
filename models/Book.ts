import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    genre: {
      type: String,
      enum: {
        values: ["fantasy", "dystopian", "children", "classic"],
        message: "{VALUE} is not a valid genre",
      },
    },
    publishedYear: {
      type: Number,
      min: [0, "publishedYear must be 0 or more"],
      max: [new Date().getFullYear(), "publishedYear cannot be in the future"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  { timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
