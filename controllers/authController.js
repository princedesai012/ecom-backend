const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'supersecretkey';

exports.register = async (req, res) => {
    const {name, email, password} = req.body;

    const userExist = await User.findOne( {email});
    if(userExist) return res.status(400).json({message: "Already Exist"});

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({name, email, password: hashedPassword});
    res.status(201).json({message: "User Registred ", userId: newUser._id});
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  };