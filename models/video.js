var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
	name: String,
	path: String,
	thumb: String,
	owner: String,
});

module.exports = mongoose.model('Video', videoSchema);