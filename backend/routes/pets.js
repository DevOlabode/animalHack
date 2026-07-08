const express = require('express');
const { listPets, getPet, createPet, updatePet, deletePet } = require('../controllers/pets');
const { isAuthenticated } = require('../middleware/auth');
const { isPetOwner } = require('../middleware/roles');

const router = express.Router();

router.use(isAuthenticated);

router.get('/:id', getPet);

router.use(isPetOwner);

router.get('/', listPets);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;
