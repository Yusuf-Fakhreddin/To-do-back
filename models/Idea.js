const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Please use a reasonable title'],
    maxlength: [20, 'Title can not be more than 20 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    minlength: [10, 'Write a reasonable description so you can get back to it'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Idea', IdeaSchema);
