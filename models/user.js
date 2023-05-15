// let mongoose = require('mongoose');

// // reference passport-local-mongoose to make this model usable for managing Users
// // findOrCreate lets us search then immediately insert if not found
// let plm = require('passport-local-mongoose');
// let findOrCreate = require('mongoose-findorcreate');
// var userSchema = new mongoose.Schema({
//     username: String,
//     password: String
// });
// // create the model schema.  username and password are included automatically
// let googleSchema = new mongoose.Schema({
//     googleId: String
// });

// userSchema.plugin(plm);
// userSchema.plugin(findOrCreate);

// module.exports = mongoose.model('User', userSchema);