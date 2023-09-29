const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");

// GET ALL RECIPES
const getRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 });
  res.status(200).json(recipes);
};

// CREATE NEW RECIPE
const createRecipe = async (req, res) => {
  const { title, user_id, ingredients, proteinSource, mealType } = req.body;
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!ingredients) {
    emptyFields.push("ingredients");
  }
  if (!proteinSource) {
    emptyFields.push("proteinSource");
  }
  if (!mealType) {
    emptyFields.push("mealType");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Some information is missing: ", emptyFields });
  }

  const recipeData = {
    title,
    user: user_id,
    ingredients,
    proteinSource,
    mealType,
  };
  // ADD DOC TO DB
  try {
    const recipe = await Recipe.create(recipeData);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE A RECIPE
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recupe" });
  }

  const recipe = await Recipe.findOneAndDelete({ _id: id });

  if (!recipe) {
    return res.status(400).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

// GET RECIPE
const getRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid recipe ID" });
  }

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    return res.status(404).json({ error: "recipe not found" });
  }

  res.status(200).json(recipe);
};

// UPDATE A RECIPE
const updateRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!recipe) {
    return res.status(400).json({ error: "No such recipe" });
  }

  res.status(200).json(grorecipeup);
};

module.exports = {
  getRecipes,
  createRecipe,
  getRecipe,
  deleteRecipe,
  updateRecipe,
};
