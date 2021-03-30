let User = require('../model/user');

// Récupérer tous les users (GET)
function getUsers(req, res){
    User.find((err, users) => {
        if(err){
            res.send(err)
        }
        res.send(users);
    });
}

function getByName(req, res){
    let userName = req.params.name;

    User.findOne({name: userName}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}

module.exports = { getUsers, getByName};
