const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    itemNo: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true
    },
    name: {
      type: String,
      required: true
    },
    currentPrice: {
      type: Number,
      required: true
    },
    previousPrice: {
      type: Number
    },
    categories: {
      type: String,
      required: true
    },
    imageUrls: [
      {
        type: String,
        required: true
      }
    ],
    genres: [
      {
        type: String,
        required: true
      }
    ],
    quantity: {
      type: Number,
      default: 0
    },
    publisher: {
      type: String,
      required: true
    },
    developer: {
      type: String,
      required: true
    },
    productUrl: {
      type: String
    },
    yearOfPublication: {
      type: Date
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

ProductSchema.index({ "$**": "text" });

module.exports = Product = mongoose.model("products", ProductSchema);
