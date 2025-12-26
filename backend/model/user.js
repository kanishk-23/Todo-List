const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const user = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required:true},
    password: {type: String, required:true},
}, {timestamps: true});


user.statics.findByEmailOrUsername = function (email_username) {
    return this.findOne({$or:[{email:email_username, username:email_username}]});
};

user.statics.signup = async function(email, username, password) {
  if (!email || !username || !password)    throw new Error('All fields are required.');
  
  if(!validator.isEmail(email))  throw Error('Email is not valid.')
  const email_exists = await this.findOne({email});
  if(email_exists)  throw Error('Email already exists!');
  
  const username_exists = await this.findOne({username});
  if(username_exists)  throw Error('Username already exists!');

  if(!validator.isStrongPassword(password))  throw Error('Password is not strong. Enter a new password')
  
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password,salt);

  const user = await this.create({email, username, password:hash})
  return user;
}

module.exports = mongoose.model('User',user)