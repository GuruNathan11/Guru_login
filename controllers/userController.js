const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "API"
const Token_time ="2m"

const signup = async (req,res) =>{

    //Existing User Check, Hashed Password, UserCreation, Token genrate

    const {username, email, password} = req.body;
    try {

        const existingUser = await userModel.findOne({ email : email});
        if(existingUser){
            return res.status(400).json({ message: "User Already Exists"});
        }
        const hasedPassword = await bcrypt.hash(password,5)
        
        const result = await userModel.create({
            email : email,
            password : hasedPassword,
            username : username
        });

        const token = jwt.sign({email : result.email, id:result._id}, SECRET_KEY);
        res.status(201).json({user:result, token:token});
        // res.status(201).json({user:result})
    } catch (error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"})
    }
    
}


const signin = async (req, res) =>{
    
    const {email, password} = req.body

    try{

        const existingUser = await userModel.findOne({ email : email});
        if(!existingUser){
            return res.status(404).json({ message : "User not Found"});
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            return res.status(401).json({ message : "invalid Credentials"});   
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, SECRET_KEY,{ expiresIn : Token_time});
        res.status(201).json({user: existingUser, token: token})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}
module.exports = { signin, signup}