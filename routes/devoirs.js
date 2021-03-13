let Devoir = require('../model/devoir');

// Récupérer tous les devoirs (GET)
function getDevoirs(req, res){
    Devoir.find((err, devoirs) => {
        if(err){
            res.send(err)
        }

        res.send(devoirs);
    });
}

module.exports = { getDevoirs };
