const express = require("express");
const {
  getRecipes,
  createRecipe,
  getRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/", requireAuth, createRecipe);
router.delete("/:id", requireAuth, deleteRecipe);
router.patch("/:id", requireAuth, updateRecipe);
// GET routes don't require auth
router.get("/", getRecipes);
router.get("/:id", getRecipe);

module.exports = router;
