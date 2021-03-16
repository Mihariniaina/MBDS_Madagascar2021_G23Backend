let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EleveSchema = Schema({
    nom: String,
    mail: String,
    dateNaissance: Date,
    photo: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Eleve', EleveSchema);
