const updateProfile = (req, res) => {
    const { name, photo, city, state} = req.body;
    req.app.get('db').userProfile.updateProfile([name, photo, city, state, req.user.user_id])

      .then(collections => res.status(200).send(collections))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }

  const getUser = (req,res) =>{
    let user_id = req.user.user_id;
    req.app.get('db').userProfile.getUser(user_id)
    .then(payload => res.status(200).json(payload))
    .catch(err => {
      console.log(err)
      res.status(500);
    });
  }




  module.exports = {
    updateProfile,
    getUser
  }