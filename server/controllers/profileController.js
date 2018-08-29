const updateProfile = (req, res) => {
  // console.log("CONTROLLER HIT")
  console.log(req.body)
    let { name, photo, city, state} = req.body;
    console.log(name, photo, city, state)

    // console.log(photo)
    if(name.length < 1) name = req.user.name;
    if(!photo) photo = req.user.profile_pic;
    if(city.length < 1) city = req.user.city;
    if(state.length < 1) state = req.user.state;

    req.user.name = name
    req.user.profile_pic = photo
    req.user.city = city
    req.user.state = state
    
    console.log(req.user)

    req.app.get('db').userProfile.updateProfile([name, photo, city, state, req.user.user_id])
      .then(users => res.status(200).send(users))
      .catch(err => {
        console.log(req.body);
        res.sendStatus(500);
      });
  }

  module.exports = {
    updateProfile
  }