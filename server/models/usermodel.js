const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
    enum: ["donar", "hospital", "organization", "admin"]
  },
  name: {
    type: String,
    required: function () {
      if (this.userType === "donar") {
        return true;
      }
      return false;
    }
  },
  hospitalname: {
    type: String,
    required: function () {
      if (this.userType === "hospital") {
        return true;
      }
      return false;
    }
  },
  organizationname: {
    type: String,
    required: function () {
      if (this.userType === "organization") {
        return true;
      }
      return false;
    },
  },
  website: {
    type: String,
    required: function () {
      if ((this.userType === "hospital") || (this.userType === "organization")) {
        return true;
      }
      return false;
    },
  },
  adress: {
    type: String,
    required: function () {
      if ((this.userType === "hospital") || (this.userType === "organization")) {
        return true;
      }
      return false;
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('users', userSchema);