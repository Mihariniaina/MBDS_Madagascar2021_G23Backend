let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let matiere = require('./routes/matieres');
let eleve = require('./routes/eleves');
let devoir = require('./routes/devoirs');

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


