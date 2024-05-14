const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    enabled: {
      type: Boolean,
      required: true,
      default: true
    },
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
    category: {
      type: Schema.Types.ObjectId,
      ref: "catalogs"
    },
    imageUrls: [
      {
        type: String,
        required: true
      }
    ],
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "filters",
        required: true
      }
    ]
    ,
    description: {
      type: String,
      required: true
    },
    publisher: {
      type: String,
      required: true
    },
    developer: {
      type: String,
      required: true
    },
    requirementsMin: [
      {
        type: String,
        required: true
      }
    ],
    requirementsRec: [
      {
        type: String,
        required: true
      }
    ],
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
