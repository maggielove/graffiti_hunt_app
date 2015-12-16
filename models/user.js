'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let placeSchema = require('./place.js').schema;
// Define the rounds/iterations the bcrypt key setup phase uses
let SALT_WORK_FACTOR = 10;

let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  created_at: Date,
  places: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ]
})

//Encrypt a password before saving it:
userSchema.pre('save', function(next){
  let user = this;
  console.log(user);

  //hash only new or modified passwords
  if (!user.isModified('password')) return next();

  //generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next (err);

    // hash the password and newly-generated salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override cleartext password with hashed password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

let User = mongoose.model('User', userSchema);
module.exports = User;
