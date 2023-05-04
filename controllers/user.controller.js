const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

module.exports = {
    allUsers: async (req, res) => {
        try{
            const users = await User.find().select('-password').lean()
            //.select() is used to include or exclude document fields, in this case we do not want to send back the users passwords

            if(!users){
                return res.status(400).json({message: 'no users found'})
            }

            res.json(users)
        }
        catch(err){
            console.log(err);
            res.status(400).json({error:err});
        }
    },
    registerUser: asyncHandler(async(req, res) => {
        const potentialUser = await User.findOne({email: req.body.email});

        if(potentialUser){
            return res.status(400).json({message: 'That email already exists'})
        }

        const newUser = await User.create(req.body);

        const userToken = jwt.sign({_id:newUser._id, email:newUser.email}, secret, {expiresIn:'2h'})
        console.log(userToken);

        if(!newUser){
            return res.status(400).json({message: 'Invalid user data received'})
        }

        res.cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000, secure: true, sameSite: 'none'}).status(201).json({message:'User Registered Succesfully'})
    }),
    login: async (req,res) => {
        try{ 
            const user = await User.findOne({email:req.body.email});
            if(user){
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordsMatch){
                    const userToken = jwt.sign({_id:user._id, email:user.email}, secret, {expiresIn:'2h'})
                    console.log(userToken);

                    res.cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000, secure: true, sameSite: 'none'}).status(201).json({message:'User logged in'})
                }else{
                    res.status(400).json({message:'Invalid Email/Password'});
                }
            }
            else{
                res.status(400).json({message:'Invalid Email/Password'});
            }
        }
        catch(err){
            res.status(400).json({error:err})
        }
    },
    logout: async (req,res) => {
        res.clearCookie('userToken', {secure: true, sameSite: 'none'}).json({message:'User is logged out'})
    }
}