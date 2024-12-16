//The purpose of this middleware is to verify whether a user is authenticated by checking the presence and validity of a JWT (JSON Web Token) stored in the user's cookies

const jwt = require('jsonwebtoken');
const Register = require("../models/registers") //becoz saara data, middlewares in registers 

const auth = async(req , res ,next) => {
    try{
        const token = req.cookies.jwt; //This token is sent by the client (usually after login) 

        const verifyUser = jwt.verify(token , process.env.SECRET_KEY); //compare token with seccret key

        console.log(verifyUser);

        const user = await Register.findOne({_id: verifyUser._id})

        console.log(user) 

        req.token = token; //for logout
        req.user = user;   //for logout
        
        next();
    }
    catch(error){
        res.status(401).send(error);
    }
}


const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'jwt-secret-2k24');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


module.exports = auth;