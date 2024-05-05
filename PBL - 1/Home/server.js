const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8800;
const MONGODB_URI = 'mongodb://localhost:27017/Database';

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
    origin: 'http://127.0.0.1:3000'
  }));
// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;
db.on('error', (error) => console.error("Error in connecting to database:", error));
db.once('open', () => console.log("Connected to database"));

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.post("/signup", (req, res) => {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;

  if (!validateEmail(email)) {
      return res.status(400).send("Invalid email format");
  }

  var data = {
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "password": password
  };

  db.collection('users').insertOne(data, (err, collection) => {
      if (err) {
          console.error("Error inserting record:", err);
          return res.status(500).send("Error inserting record");
      }
      console.log("Record inserted successfully");
      return res.status(200).send("Signup Successful");

  });
});

app.get("/login", (req,res)=>{
  res.render("login");
})

app.post("/login", async (req, res) => {
  try {
      // Extract email and password from the request body
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email || !password) {
          throw new Error("Email and password are required.");
      }

      // Check database connection
      if (db.readyState !== 1) {
          throw new Error("Database connection failed.");
      }

      // Attempt to find the user in the database
      let user;
      try {
          user = await db.collection('users').findOne({ email: email, password: password });
      } catch (error) {
          console.error("Error finding user:", error);
          throw new Error("Internal server error");
      }

      
      if (user) {
        console.log("Login Success");
        return res.status(200).send("Login Successful");
      }
      else{// If user is not found, return 401 Unauthorized
        return res.status(401).send("Invalid email or password");
      }

  } catch (error) {
      // Handle any caught errors
      console.error("Login error:", error);
      res.status(500).send(error.message || "Internal server error");
  }
});

// Define route to handle filtered places request
app.get('/api/places', async (req, res) => {
  try {
    // Extract filter parameters from query string
    const { purpose, location, duration, budget } = req.query;

    // Construct MongoDB query based on filter parameters
    const query = {
      purpose: purpose,
      location: location,
      duration: { $lte: parseInt(duration) }, // Less than or equal to duration
      budget: { $lte: parseInt(budget) } // Less than or equal to budget
    };

    // Query the database with constructed query
    const result = await db.collection('Filter').find(query).toArray();
    
    console.log("Search results:", result);
    
    // Return filtered places data as JSON response
    res.json(result);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

