var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//used to encrypt password
var bcrypt = require('bcrypt-nodejs');
var userSchema = new Schema({
  email: {type: String, required:true},
  password: {type:String, required:true}
});
userSchema.methods.encryptPassword = function(password){
  //creating a method to encrypt password
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
};
//creating a method to check if a password matches the hashed password
userSchema.methods.validPassword = function(password){
  //this.password refers to this password parameter
    return bcyrpt.compareSync(password, this.password)
};
module.exports = mongoose.model("User", userSchema);
