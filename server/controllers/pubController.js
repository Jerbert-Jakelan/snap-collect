const getAllPublic = (req, res) => {

    req.app
      .get("db")
      .publicCollections.public()
      .then(collections => res.status(200).send(collections))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  };

  module.exports={
    getAllPublic
  }