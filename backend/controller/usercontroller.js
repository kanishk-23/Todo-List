const User = require("../model/user");
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const getUser = async (req, res) => {
    try{
        const {email} = req.params;
        const user = await User.findByEmailOrUsername(email);
        res.status(200).json({success:true, data: user});
    }
    catch(err){
        res.status(400).json({success:false, message:'Server error'});
    }
};  

const createNewUser = async (req, res) => {
    try{
        const data = req.body;
        // basic validation
        if(!data.email || !data.username || !data.password) throw new Error("All the fields are required");

        const newuser = await User.signup(data.email, data.username, data.password);
        const token = createToken(newuser._id);
        res.status(201).json({success:true, message:'New user created successfully' , data: token});

    }catch (err) {
        res.status(500).json({success:false, message:err.message});
    }
};

// const loginUser = async (req,res) => {
//     try{
//         const data = req.body;
//         res.status(200).json({success:true, message:`User'${} loggedd in successsfully`});
//     }catch(err){
//         res.status(500).json({success:false, message: err.message});
//     }
// }

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
  getUser,
  createNewUser,
  loginUser,
  updateUser,
  deleteUser,
};