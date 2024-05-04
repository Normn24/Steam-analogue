const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FilterSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = Filter = mongoose.model("filters", FilterSchema);