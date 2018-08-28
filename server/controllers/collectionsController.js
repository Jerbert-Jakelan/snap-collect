const addCollection = (req, res) => {
  let {catId, name} = req.body;
  let userId = req.user.user_id;;

  req.app.get('db').collections.add_collection([name, catId, userId])
    .then(collections => res.status(200).send(collections))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}

const deleteCollection = (req, res) => {
  let userId = req.user.user_id;

  req.app.get('db').collections.delete_collection([req.params.collection_id, userId])
    .then(collections => res.status(200).send(collections))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}

const getCollections = (req, res) => {
  let userId = req.user.user_id;

  req.app.get('db').collections.get_collections_by_user(userId)
    .then(collections => res.status(200).send(collections))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}

const editCollection = (req, res) => {
  let userId = req.user.user_id;

  req.app.get('db').collections.edit_collection([req.params.collection_id, req.body.name, userId])
    .then(collections => res.status(200).send(collections))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}

module.exports = {
  addCollection,
  deleteCollection,
  getCollections,
  editCollection
}