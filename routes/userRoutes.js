const express = require('express');
const router = express.Router();

const { 
  register, 
  login, 
profile, 
  addUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController'); 

const auth = require('../middleware/authMiddleware');
// AUTH 
router.post('/register', register);
router.post('/login', login);

// crud (protected)
router.get('/profile', auth, profile);
router.post('/users', auth, addUser);
router.put('/users/:id', auth, updateUser);
router.delete('/users/:id', auth, deleteUser);

module.exports = router;