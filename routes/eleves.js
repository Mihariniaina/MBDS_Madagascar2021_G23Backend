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

module.exports = { getEleves };
