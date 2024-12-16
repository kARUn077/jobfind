//backend
const express = require("express")
const app = express()
const PORT = require("port")
const port = process.env.PORT || 4502;
const cors = require("cors");
const hbs = require("hbs");   //partial ke liye
const path = require("path");
require("./db/connection");
const bcrypt = require("bcryptjs")

//diff between encryption and hashing -> encryption is bad , it is two sided , it is decodable , but hashig is good , it is one sided , and even in hahsing , bcrypt is good one..


const Register = require("./models/registers");
const {json} = require("express")

const UserRoute = require("./routes/User.route");
const AdminRoute = require("./routes/Admin.route");
const JobRoute = require("./routes/Job.route");
const ApplicationRoute = require("./routes/Application.route");

const corsOptions ={
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}; 

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set("view engine","hbs");


const static_path = path.join(__dirname , "../public")
const template_path = path.join(__dirname , "../templates/views");
const partials_path = path.join(__dirname , "../templates/partials");

//humne jo file banayi h , public -> index.html mein ,usko access karne ke liye , uska path define kare h ,as static_path , aur phir usko , niche use kare h

app.use(express.json());

app.use(express.static(static_path));


//The line app.use(express.static(static_path)); in an Express application is used to serve static files, such as HTML, CSS, JavaScript, images, or any other assets that don't require server-side processing.


app.set("view engine" , "hbs");
app.set("views" , template_path);
hbs.registerPartials(partials_path);

// app.get("/" , (req, res) => {
//     res.send("hello guys")
// })

app.get("/" , (req, res) => {
    res.render("index")
})

app.get("/register" , (req, res) => {
    res.render("register")
})

app.get("/login" , (req, res) => {
    res.render("login")
})

//create a new user in our database
app.post("/register" , async(req, res) => {
    try{
       const password = req.body.password.trim();
       const confirmpassword = req.body.confirmpassword.trim();

       if(password === confirmpassword){
        const registerEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            age: req.body.age,
            password: password,
            confirmpassword: confirmpassword,

        })

        console.log("the success part " + registerEmployee);

        const token = await registerEmployee.generateAuthToken();

        console.log("the token part " + token);

        const registered = await registerEmployee.save();
        console.log("the page part " + registered)
        res.status(201).render("index");


       }else{
        res.send("password are not matching")
       }

    }catch(error){
        res.status(400).send(error);
        console.log("the error part page")
    }

})


//login check
app.post("/login" , async(req ,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password , useremail.password);

        const token = await useremail.generateAuthToken();

        console.log("the token part " + token);

        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("Invalid login details");
        }

    }catch(error){
        res.status(400).send("Invalid login details")
    }
})

//If it exists, it serves the file directly to the client.
// If it doesn't exist, the request moves to the next middleware or route handler


// console.log(path.join(__dirname , "../"))


app.use("/api", UserRoute)
app.use("/api", AdminRoute)
app.use("/api", JobRoute)
app.use("/api", ApplicationRoute)

const jwt = require("jsonwebtoken");
const { createDiffieHellmanGroup } = require("crypto");

// const createToken = async() => {
//     const token = await jwt.sign({_id:"675ae5dfcacd7efda1ba39d7"} , "achauscuahscbahcbahssbchahbscshbabhcbahbh" , {
//         expiresIn: "2 seconds"
//     })
//     console.log(token)

//     const userVer = await jwt.verify(token ,"achauscuahscbahcbahssbchahbscshbabhcbahbh")
//     console.log(userVer)
// }

// createToken();
// JWT is commonly used to verify the identity of a user after they log in to an application.


app.listen(port , (req , res)=>{
    console.log( `Server is running at ${port}`)
}) 