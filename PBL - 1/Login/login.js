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

app.post("/sign_up", (req, res) => {
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
        "password": password,
    };

    db.collection('user').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record inserted successfully");
        let 
        return res.redirect('./login.html');
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
}).listen(4000);

app.get("/login", (req,res)=>{
    res.render("login");
})

app.post("/login", async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await db.collection('user').findOne({email:email});

        if(useremail.password=== password){
            res.status(201).redirect("./home.html");
        }else{
            res.send("Invalid login details");
        }

    } catch (error){
        res.status(400).send("Invalid login details")
    }
})


console.log("Listening on port 4000");
