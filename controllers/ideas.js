const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Idea = require('../models/Idea');

// @desc  Create new Idea
// @route  POST /api/v1/ideas
// @access   Private

exports.addIdea = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const idea = await Idea.create(req.body);

  res.status(201).json({ success: true, data: idea });
});

// @desc  Get all ideas
// @route  GET /api/v1/ideas
// @access   Private

exports.getIdeas = asyncHandler(async (req, res, next) => {
  const ideas = await Idea.find();

  res.status(200).json({ success: true, data: ideas });
});

//to be used in a route

// @desc  get single idea
// @route  GET /api/v1/ideas/:io
// @access   Private

exports.getIdea = asyncHandler(async (req, res, next) => {
  const idea = await Idea.findById(req.params.id);

  res.status(200).json({ success: true, data: idea });
});
