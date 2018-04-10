const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let EventSchema = new Schema({
	id: { type: Number, required: true, unique: true },
	title: { type: String, required: true, unique: true},
	start: { type: Date, required: true},
	end: { type: Date, required: false},
	usuario:{ type: String, required: true}
})

let EventModel = mongoose.model('eventos', EventSchema);

module.exports = EventModel
