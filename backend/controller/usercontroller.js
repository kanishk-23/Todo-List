const User = require("../model/user");
const jwt = require('jsonwebtoken')

const createToken = (_id,email)=>{
    return jwt.sign({_id,email}, process.env.SECRET, {expiresIn: '1d'})
}

// const getUser = async (req, res) => {
//     try{
//         const {email} = req.params;
//         const user = await User.findByEmailOrUsername(email);
//         if(!user) return res.status(400).json({success:false, message:'User not found'});
//         res.status(200).json({success:true, data: user});
//     }
//     catch(err){
//         res.status(400).json({success:false, message:'Server error'});
//     }
// };  

const createNewUser = async (req, res) => {
    try{
        const data = req.body;
        const newuser = await User.signup(data.email, data.username, data.password);
        const token = createToken(newuser._id, newuser.email);
        res.status(201).json({success:true, message:'New user created successfully' , data: {token, newuser}});
    }catch (err) {
        res.status(500).json({success:false, message:err.message});
    }
};

const loginUser = async (req,res) => {
    const data = req.body;
    try{
        const user = await User.login(data.email, data.password);
        const token = createToken(user._id, user.email);
        res.status(200).json({success:true, data:{token,user}, message:`User'${user.username} logged in successfully`});
    }catch(err){
        res.status(500).json({success:false, message: err.message});
    }
}

const updateUser = async (req, res) => {
    try{
        const {email} = req.params;
        const data = req.body;
        const allowedFields = ['password'];
        const keys = Object.keys(data);
        for (const key of keys){
            if (!allowedFields.includes(key))  return res.status(400).json({success: false, message: `Field '${key}' cannot be modified or does not exist`});
        }
        // fetching User details
        const user = await User.findByEmailOrUsername(email);
        if(!user) return res.status(400).json({success:false, message:'User not found'});
        if ('password' in data) user.password = data.password;
        await user.save();
        res.status(200).json({success:true, message:`User information updated successfully` , data: user});

    }catch (err) {
        res.status(400).json({success:false, message:'Server error'});
    }
};  

const deleteUser = async (req, res) => {
    try{
        const {email} = req.params;
        const user = await User.findByEmailOrUsername(email);
        if(!user) return res.status(400).json({success:false, message:'User not found'});
        res.status(200).json({success:true, message:'User deleted'});
    }
    catch(err){
        res.status(400).json({success:false, message:'Server error'});
    }
}; 

module.exports = {
//   getUser,
  createNewUser,
  loginUser,
//   updateUser,
//   deleteUser,
};