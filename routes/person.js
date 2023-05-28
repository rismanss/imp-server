const express = require('express');
const router = express.Router();
const person = require('../controllers').person;

router.get('/', person.getAll);
router.get('/:id', person.getById);
router.post('/', person.add);
router.patch('/:id', person.update);
router.delete('/:id', person.remove);

module.exports = router;
