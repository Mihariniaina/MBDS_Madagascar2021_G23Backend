const assignment = require('../model/matiere');
const eleve = require('../model/eleve');

// Récupérer tous les eleves (GET)
function getEleves(req, res){
    eleve.find((err, eleves) => {
        if(err){
            res.send(err)
        }
        res.send(eleves);
    });
}

function getEleveById(req, res){
    let id = req.params.id
    eleve.findOne({_id: id}, (err, eleve) => {
        if(err){
            res.send(err)
        }
        res.send(eleve);
    });
}

module.exports = { getEleves, getEleveById };
