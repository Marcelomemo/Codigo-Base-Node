const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
	userId: { type: Number, required: true, unique: true},
	usuario: { type: String, required: true, unique: true},
	password: { type: String, required: true},
	nombres: { type: String, required: true},
	fecha_nacimiento: { type: Date, required: true}
})

let UserModel = mongoose.model('usuarios', UserSchema);

module.exports = UserModel