const express = require('express');
const { listPets, getPet, createPet, updatePet, deletePet } = require('../controllers/pets');
const { isAuthenticated } = require('../middleware/auth');
const { isPetOwner } = require('../middleware/roles');

const router = express.Router();

router.use(isAuthenticated, isPetOwner);

router.get('/', listPets);
router.post('/', createPet);
router.get('/:id', getPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;
