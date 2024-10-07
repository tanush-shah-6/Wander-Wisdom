var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


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

    db.collection('user').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record inserted successfully");
        return res.redirect('./login.html');
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('./login.html');
}).listen(4000);

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
            user = await db.collection('user').findOne({ email: email, password: password });
        } catch (error) {
            console.error("Error finding user:", error);
            throw new Error("Internal server error");
        }

        // If user is not found, return 401 Unauthorized
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        // If user is found, generate a token (implement this function)
        const token = generateToken(user);

        // Send the token in the response
        res.status(200).json({ token: token });
    } catch (error) {
        // Handle any caught errors
        console.error("Login error:", error);
        res.status(500).send(error.message || "Internal server error");
    }
});




console.log("Listening on port 4000");
