let Devoir = require('../model/devoir');

function recherche(req, res){
    var texte = req.params.texte;
    Devoir.find(
        {
            $or: [
                {
                    "auteur.nom":  {
                        $regex: texte,
                        $options: 'i'
                    }
                },
                {
                    "matiere.nom":  {
                        $regex: texte,
                        $options: 'i'
                    }
                },
                {
                    "matiere.professeur":  {
                        $regex: texte,
                        $options: 'i'
                    }
                },
                {
                    nomDevoir: {
                        $regex: texte,
                        $options: 'i'
                    }
                }
            ]
        }, (err, devoirs) => {
        if(err){
            res.send(err)
        }
        res.send(devoirs);
    });
}

function getMoyenneEleve(req, res){
    let eleveId = req.params.id;

    Devoir.aggregate(
        [
            { $match: { rendu: true, "auteur._id": eleveId } },
            { $group: { _id: "$auteur._id", resultat: { $avg: "$note" } } }
        ], (err, data) => {
            if(err){
                res.send(err)
            }
            res.json(data[0]);
        }
    );
}

function getNbDevoirRenduOuNonGroupByEleve(req, res){
    let estRenduString = req.params.estRendu;
    var estRendu = true
    if(estRenduString === "false") estRendu = false;
    Devoir.aggregate(
        [
            { $match: { rendu: estRendu } },
            { $group: { _id: "$auteur.nom", resultat: { $sum: 1 } } }
        ], (err, data) => {
            if(err){
                res.send(err)
            }
            res.json(data);
        }
    );
}

function getNbDevoirRenduEleve(req, res){
    let eleveId = req.params.id;

    Devoir.aggregate(
        [
            { $match: { rendu: true, "auteur._id": eleveId } },
            { $group: { _id: "$auteur._id", resultat: { $sum: 1 } } }
        ], (err, data) => {
            if(err){
                res.send(err)
            }
            res.json(data[0]);
        }
    );
}

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

// // R??cup??rer un assignment par son id (GET)
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
          res.json({message: 'Le devoir a ??t?? modifi??'})
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
            res.send('Erreur d ajout devoir', err);
        }
        res.json({ message: "Devoir ajout??"})
    });
}

module.exports = { getNbDevoirRenduOuNonGroupByEleve, recherche, getMoyenneEleve, getNbDevoirRenduEleve, getDevoirsRendus, getDevoirsNonRendus, getDevoirById, modifierDevoir, ajoutDevoir };
