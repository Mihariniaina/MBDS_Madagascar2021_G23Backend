let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let matiere = require('./routes/matieres');
let eleve = require('./routes/eleves');
let devoir = require('./routes/devoirs');
let users = require('./routes/users');
var jwt = require('jsonwebtoken');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
//const uri = 'mongodb+srv://rna:rnaMdp@clusternoteko.8wmfa.mongodb.net/assignments?retryWrites=true&w=majority';
const uri = 'mongodb+srv://groupe23:root@cluster0.vlxli.mongodb.net/assignments_gp23?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments_gp23 dans le cloud Rilah!");
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/matieres')
  .get(matiere.getMatieres);

app.route(prefix + '/eleves')
  .get(eleve.getEleves);

app.route(prefix + '/devoirs')
  .get(devoir.getDevoirs);

app.route(prefix + '/users')
  .get(users.getUsers);

app.route(prefix + '/users/:name')
  .get(users.getByName)

  /* ------------------- TOKEN ------------------------- */

//any am rah diso dia mijanona eo ihany izy fa rah marina dia 
//hoentina ato le valiny azo via, get ohatra
//comparer_na am ao anaty bdd
//refa marina dia averina any am page d'accueil an front izy
  
  app.post('/api/login/', function (req, res) {
    //auth user
    var id = req.param('id');
    var mail = req.param('mail');
    var password = req.param('password');
    const user = { 
      id: id,
      mail: mail,
      password: password
    };
    const token = jwt.sign({user}, 'my_secret_key')
    res.json({
      token: token
    });
  });

  //protéger_na ito liens ito
  app.get('/api/protected', ensureToken, function(req, res){
    jwt.verify(req.token, 'my_secret_key', function(err, data){
      if(err){
        res.sendStatus(403)
      }else{
        res.json({
          text: 'this is protected2',
          data: data
        });
      }
    }); 
  });

  //omena token iz rah marina le head
  function ensureToken(req, res, next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token =bearerToken;
      next();
    } else{
      res.sendStatus(403);
    }
  }

// app.route(prefix + '/assignments/:id')
//   .get(assignment.getAssignment)
//   .delete(assignment.deleteAssignment);


// app.route(prefix + '/assignments')
//   .post(assignment.postAssignment)
//   .put(assignment.updateAssignment);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


