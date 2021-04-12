let matiere = require('../model/matiere');

// Récupérer tous les assignments (GET)
function getMatieres(req, res){
    matiere.find((err, matieres) => {
        if(err){
            res.send(err)
        }

        res.send(matieres);
    });
}

function getMatiereById(req, res){
    let id = req.params.id
    matiere.findOne({_id: id}, (err, eleve) => {
        if(err){
            res.send(err)
        }
        res.send(eleve);
    });
}

module.exports = { getMatieres, getMatiereById };
