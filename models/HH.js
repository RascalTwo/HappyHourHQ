const mongoose = require('mongoose');

const HHSchema = new mongoose.Schema({
	
		name: {type: String}, 
        startTime: {type: String},
        endTime: {type: String},  
		address: {type: String},
		zipcode: {type: String},
		state: {type: String},
		website: {type: String},
        monday: {type: Boolean},
		tuesday: {type: Boolean},
		wednesday: {type: Boolean},
		thursday: {type: Boolean},
		friday: {type: Boolean},
		saturday: {type: Boolean},
		sunday: {type: Boolean},
		user: {type: mongoose.Schema.Types.ObjectId},
		createdAt: {type: Date, default: Date.now},
		ovRating: {type: Array},
		ovRatingAvg: {type: Number},
		worthRating:{type: Array},
		worthRatingAvg: {type: Number},
		sizeRating:{type: Array},
		sizeRatingAvg:{type: Number},
		ambRating:{type: Array},
		ambRatingAvg:{type: Number},
		tasteRating:{type: Array},
		tasteRatingAvg:{type: Number},
		ratedBy: {type: Array},
		
		
});

module.exports = mongoose.model("HHData", HHSchema)