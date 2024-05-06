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


mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;
db.on('error', (error) => console.error("Error in connecting to database:", error));
db.once('open', () => console.log("Connected to database"));

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.post("/signup", async (req, res) => {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;

  if (!validateEmail(email)) {
      return res.status(400).send("Invalid email format");
  }

  try {
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
        return res.status(409).send("Email already exists");
    }
  } catch (error) {
      console.error("Error checking existing email:", error);
      return res.status(500).send("Error checking existing email");
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

      const { email, password } = req.body;


      if (!email || !password) {
          throw new Error("Email and password are required.");
      }

      if (db.readyState !== 1) {
          throw new Error("Database connection failed.");
      }


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
      else{
        return res.status(401).send("Invalid email or password");
      }

  } catch (error) {

      console.error("Login error:", error);
      res.status(500).send(error.message || "Internal server error");
  }
});

app.get('/api/places', async (req, res) => {
  try {
    const { purpose, location, duration, budget } = req.query;


    const query = {
      purpose: purpose,
      location: location,
      duration: { $lte: parseInt(duration) }, 
      budget: { $lte: parseInt(budget) } 
    };

    const result = await db.collection('Filter').find(query).toArray();
    
    console.log("Search results:", result);
    
    res.json(result);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

