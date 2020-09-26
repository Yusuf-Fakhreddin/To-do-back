const express = require('express');
const { addIdea, getIdeas, getIdea } = require('../controllers/ideas');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, addIdea).get(protect, getIdeas);
router.route('/:id').get(protect, getIdea);

module.exports = router;
