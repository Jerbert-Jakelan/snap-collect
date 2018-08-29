const updateProfile = (req, res) => {
    const { name, photo, city, state} = req.body;
console.log(req.body)
    req.app.get('db').userProfile.updateProfile([name, photo, city, state, req.user.user_id])

      .then(collections => res.status(200).send(collections))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }

  module.exports = {
    updateProfile
  }