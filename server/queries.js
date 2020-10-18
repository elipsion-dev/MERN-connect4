const SaveGame = require("./mongo/mongoModel");
require("./mongo/mongoConnect")

// Find all game saves
function get(req, res, next) {
  SaveGame.find({})
    .then(results => res.json(results))
    .catch(next)
}

function checkName(req, res, next) {
  SaveGame.find({name: req.params.name})
    .then(result => {
      res.json(result)
    })
    .catch(next)
}

// Post a new SaveGame to the collection
function create(req, res, next) {
  let save = req.body
  const newSave = new SaveGame({ 
    name: save.name,
    rows: save.rows,
    columns: save.columns,
    nextPlayer: save.nextPlayer,
    winner: save.winner,
    banner: save.banner,
    loadScreen: save.loadScreen,
    saveScreen: save.saveScreen,
    warning: save.warning,
    loads: save.loads
  });
  SaveGame.create(newSave)
    .then(results => res.json(results))
    .catch(next);
}

// Remove a SaveGame from the collection
function destroy(req, res, next) {
  const name = req.params.name;
  SaveGame.findOneAndRemove({name: name})
    .then(results => res.send(results))
    .catch(next);
}

module.exports = { get, create, destroy, checkName };
