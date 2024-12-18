// The controller folder in a backend project serves an important role in structuring the application and maintaining the MVC architecture

import mongoose from "mongoose";
// const personData = require("../schema/UserData");
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
const { registrationMail } = require("../middleware/registrationMail.js"); 

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


// const register = async (req, res) => {
//     try {
//         const ifExists = await personData.findOne({ email: req.body.email });
//         if (ifExists) {
//             res.status(201).json("Email Already Exists");
//         }
//         else {
//             const registerPerson = new personData({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password
//             })
//             const registered = await registerPerson.save();

//             // to send the mail
//             registrationMail(req.body.name, req.body.email);

//             res.status(201).json({
//                 success: true,
//                 message: "registered"
//             });
//         }
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const ifExists = await personData.findOne({ email: email })

//         if (ifExists) {
//             if (ifExists.password == password) {

//                 const token = jwt.sign(
//                     { id:ifExists._id, name:ifExists.name, email:ifExists.email },
//                     'jwt-secret-2k24',
//                     { expiresIn: '30d'}
//                 );
//                 res.cookie('token',token,{
//                     httpOnly: true,
//                     maxAge: 24 * 60 * 60 * 1000
//                 });
//                 res.json({
//                     success: true,
//                     token: token,
//                     email: ifExists.email,
//                     message: "success"
//                 });
//             }
//             else {
//                 res.json({message: "Incorrect Password"});
//             }
//         }
//         else {
//             res.json({message:"Please Register"});
//         }
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// const verifyToken=async(req,res)=>{
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ valid: false,data:null});

//     jwt.verify(token, 'jwt-secret-2k24', (err, decoded) => {
//         if (err) return res.status(401).json({ valid: false ,data:null});
//         return res.json({ valid: true ,data:decoded, message: "ok"});
//     });
// }

// const fetchUser = async (req, res) => {
//     try {
//         const fetchUserData = await personData.findOne({_id:req.user.id});
        
//         res.status(201).json({
//             success: true,
//             data: "updated user profile",
//             message: fetchUserData,
//         });
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// const updateUser = async (req, res) => {
//     try {
//         const updatedUser = await personData.updateMany({_id:req.user.id},
//             {
//                 name:req.body.name,
//                 email:req.body.email,
//                 gender:req.body.gender,
//             }
//         );
//         const personDetail = await personData.updateOne({_id:req.user.id},
//             {    
//                 $set:
//                 {
//                     personalDetails:
//                     { 
//                         mobile:req.body.mobile,
//                         qualification:req.body.qualification,
//                         city:req.body.city,
//                         state:req.body.state,
//                     }
//                 }
//             }
//         );
//         res.status(201).json({
//             success: true,
//             data: "updated user profile",
//             message: updatedUser,
//             value: personDetail,
//         });
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


// module.exports = { register, login, verifyToken, fetchUser, updateUser}