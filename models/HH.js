const mongoose = require('mongoose');

const HHSchema = new mongoose.Schema({
	
		name: {type: String}, 
        startTime: {type: String},
        endTime: {type: String},  
		address: {type: String},
		website: {type: String},
		rating: {type: Array},
        monday: {type: Boolean},
		tuesday: {type: Boolean},
		wednesday: {type: Boolean},
		thursday: {type: Boolean},
		friday: {type: Boolean},
		saturday: {type: Boolean},
		sunday: {type: Boolean},
		user: {type: mongoose.Schema.Types.ObjectId},
		createdAt: {type: Date, default: Date.now},
		ratedBy: {type: Array},
		ratingAvg: {type: Number}
		
});

module.exports = mongoose.model("HHData", HHSchema)