//backend
const express = require("express")
const app = express()
const PORT = require("port")
const port = 4500
const cors = require("cors");
const hbs = require("hbs");
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
const views_path = path.join(__dirname,"../templates");
app.set("views",views_path);


app.get("/",(req,res)=>{
    res.render("index");
});

app.use("/api", UserRoute)

app.listen(port , (req , res)=>{
    console.log( `Server is running at ${port}`)
})