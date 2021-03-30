let Devoir = require('../model/devoir');

function getDevoirsRendus(req, res){
    Devoir.find({rendu: true}, (err, devoirs) => {
        if(err){
            res.send(err)
        }
        res.send(devoirs);
    });
}

function getDevoirsNonRendus(req, res){
    Devoir.find({rendu: false}, (err, devoirs) => {
        if(err){
            res.send(err);
        }
        res.send(devoirs);
    });
}

// // Récupérer un assignment par son id (GET)
function getDevoirById(req, res){
    let devoirId = req.params.id;
    Devoir.findOne({_id: devoirId}, (err, devoir) =>{
        if(err){
            res.send(err);
        }
        res.json(devoir);
    })
}

// Update d'un assignment (PUT)
function modifierDevoir(req, res) {
    console.log("UPDATE recu devoir : ");
    console.log(req.body);
    Devoir.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, devoir) => {
        if (err) {
            res.send(err)
        } else {
          res.json({message: 'Le devoir a été modifié'})
        }
    });
}

// Ajout d'un assignment (POST)
function ajoutDevoir(req, res){
    let devoir = new Devoir();
    devoir.auteur = req.body.auteur;
    devoir.matiere = req.body.matiere;
    devoir.nomDevoir = req.body.nomDevoir;
    devoir.note = req.body.note;
    devoir.remarque = req.body.remarque;
    devoir.rendu = req.body.rendu;
    devoir.dateDeRendu = req.body.dateDeRendu;
    
    devoir.save( (err) => {
        if(err){
            res.send('Erreur ajout devoir', err);
        }
        res.json({ message: "Devoir ajouté"})
    });
}

module.exports = { getDevoirsRendus, getDevoirsNonRendus, getDevoirById, modifierDevoir, ajoutDevoir };