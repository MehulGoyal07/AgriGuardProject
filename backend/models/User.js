const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() {
    return !this.isGoogleUser;
  }},
  isGoogleUser: {
    type: Boolean,
    default: false
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", UserSchema);
