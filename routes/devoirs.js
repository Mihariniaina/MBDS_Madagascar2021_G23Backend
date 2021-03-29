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

module.exports = { getDevoirsRendus, getDevoirsNonRendus, getDevoirById, modifierDevoir };
