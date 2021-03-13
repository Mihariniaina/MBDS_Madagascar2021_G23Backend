const { Double } = require('mongodb');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DevoirSchema = Schema({
    auteur: String,
    matiereId: String,
    note: Number,
    remarque: String,
    rendu: Boolean,
    dateDeRendu: Date
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Devoir', DevoirSchema);
