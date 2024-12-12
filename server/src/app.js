//backend
const express = require("express")
const app = express()
const PORT = require("port")
const port = process.env.PORT || 4502;
const cors = require("cors");
const hbs = require("hbs");   //partial ke liye
const path = require("path");
require("./db/connection");

const UserRoute = require("./routes/User.route");

const corsOptions ={
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}; 

app.use(cors(corsOptions));
app.use(express.json());


app.set("view engine","hbs");


const static_path = path.join(__dirname , "../public")
const template_path = path.join(__dirname , "../templates/views");
const partials_path = path.join(__dirname , "../templates/partials");

//humne jo file banayi h , public -> index.html mein ,usko access karne ke liye , uska path define kare h ,as static_path , aur phir usko , niche use kare h
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
//If it exists, it serves the file directly to the client.
// If it doesn't exist, the request moves to the next middleware or route handler


// console.log(path.join(__dirname , "../"))



app.get("/",(req,res)=>{
    res.render("index");
});

app.use("/api", UserRoute)

app.listen(port , (req , res)=>{
    console.log( `Server is running at ${port}`)
}) 