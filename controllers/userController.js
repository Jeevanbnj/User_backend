const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registration
exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existing = await User.findOne({email});
        if (existing) {
            return res.status(400).json({message: 'User already exists!!'});
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        res.json({message: 'User registered succesfully!!', user});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'User not found!'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid Password!!'});
        }

        const token = jwt.sign(
            {id: user._id},
                process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.json(token);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

//User profile
exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
  
// ADD USER 
exports.addUser = async (req, res) => { 
  const user = await User.create(req.body); 
  res.json(user); 
}; 
  
// UPDATE 
exports.updateUser = async (req, res) => { 
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
new: true }); 
  res.json(user); 
}; 
  
// DELETE 
exports.deleteUser = async (req, res) => { 
  await User.findByIdAndDelete(req.params.id); 
  res.json({ message: "Deleted" })
};