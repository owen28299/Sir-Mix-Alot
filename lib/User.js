var Model = require("./Model.js");

function User(){
  this.id = null;
  var UserSchema = {
    username: String,
    password: String
  };
  Model.call(this, UserSchema);
}

Model.extend(User);

module.exports = User;