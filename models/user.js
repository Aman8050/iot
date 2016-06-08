var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');

var userSchema = mongoose.Schema({

	name: String,

	local : {
		email : String,
		password : String
	},

	facebook : {
		id : String,
		token : String,
		email : String,
		name : String
	}

});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password) {
	console.log("Validating " + password + "...");
	return bcrypt.compareSync(password,this.local.password);
};

module.exports = mongoose.model('User', userSchema);