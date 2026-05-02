require('dotenv').config();
const express = require('express'); 
const cors = require('cors'); 
const connectDB = require('dotenv').config(); 
  
const app = express(); 
  
app.use(cors()); 
app.use(express.json()); 
  
connectDB(); 
  
app.use('/api/users', require('./routes/userRoutes')); 
  
app.listen(5000, () => console.log("Server running"));