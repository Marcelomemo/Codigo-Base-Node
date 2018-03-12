const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
	userId: { type: Number, required: true, unique: true},
	correo: { type: String, required: true, unique: true},
	password: { type: String, required: true},
	nombres: { type: String, required: true},
	fecha_nacimiento: { type: Date, required: true}
})

let UserModel = mongoose.model('Usuario', UserSchema)

module.exports = UserModel