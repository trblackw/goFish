const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcryptjs"),
  SALT_WORK_FACTOR = 10,
  Joi = require("joi");

mongoose.set("debug", true);

const UserSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 30,
    required: true
  },
  city: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: false
  },
  state: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: false
  }
});

UserSchema.pre("save", function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

const validateUser = user => {
  const schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required(),
    city: Joi.string()
      .alphanum()
      .min(3)
      .max(15),
    state: Joi.string()
      .alphanum()
      .min(3)
      .max(15)
  };
  return Joi.validate(user, schema);
};

module.exports = { User, validateUser };
