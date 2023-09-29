const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    proteinSource: {
      type: String,
      required: true,
    },
    mealType: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ingredients: [ingredientSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
