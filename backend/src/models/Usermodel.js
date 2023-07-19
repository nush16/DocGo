const mongoose = require("mongoose");

class User {
  // User properties stored in the database.
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
