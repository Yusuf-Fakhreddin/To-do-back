const express = require('express');
const { addIdea, getIdeas, getIdea } = require('../controllers/ideas');

const router = express.Router();

router.route('/').post(addIdea).get(getIdeas);
router.route('/:id').get(getIdea);

module.exports = router;
