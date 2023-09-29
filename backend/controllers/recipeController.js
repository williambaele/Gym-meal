const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");

// GET ALL GROUPS
const getRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 });
  res.status(200).json(recipes);
};

// CREATE NEW GROUP
const createGroup = async (req, res) => {
  const { name, user_id, groupMembers } = req.body;
  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!groupMembers) {
    emptyFields.push("group members");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Some information is missing: ", emptyFields });
  }

  const groupData = {
    name,
    user: user_id,
    members: groupMembers,
  };
  // ADD DOC TO DB
  try {
    const group = await Group.create(groupData);
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE A GROUP
const deleteGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }

  const group = await Group.findOneAndDelete({ _id: id });

  if (!group) {
    return res.status(400).json({ error: "No such group" });
  }

  res.status(200).json(group);
};

// GET GROUP
const getGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid group ID" });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: "Group not found" });
  }

  res.status(200).json(group);
};

// UPDATE A GROUP
const updateGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }

  const group = await Group.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!group) {
    return res.status(400).json({ error: "No such group" });
  }

  res.status(200).json(group);
};

module.exports = { getGroups, createGroup, getGroup, deleteGroup, updateGroup };
