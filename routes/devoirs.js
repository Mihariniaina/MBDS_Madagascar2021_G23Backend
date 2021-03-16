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

module.exports = { getDevoirsRendus, getDevoirsNonRendus, getDevoirById };
