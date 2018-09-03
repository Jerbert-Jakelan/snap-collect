const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `collections/${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

const updateProfile = (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, async (error, fields, files) => {
    let { name, city, state } = fields;
    let photo = req.user.profile_pic;

    if (error) throw new Error(error);

    if (files.file) {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `${timestamp}`;
      const data = await uploadFile(buffer, fileName, type);
      photo = data.Location;
    }

    name = name[0].length < 1 ? req.user.name : name[0];
    city = city[0].length < 1 ? req.user.city : city[0];
    state = state[0].length < 1 ? req.user.state : state[0];

    if (state[0].length < 1) state = req.user.state;

    req.user.name = name;
    req.user.profile_pic = photo;
    req.user.city = city;
    req.user.state = state;

    req.app
      .get("db")
      .userProfile.updateProfile([name, photo, city, state, req.user.user_id])
      .then(users => res.status(200).send(users))
      .catch(err => {
        console.log(req.body);
        res.sendStatus(500);
      });
  });
};

const getUser = (req, res) => {
  let user_id = req.user.user_id;
  req.app
    .get("db")
    .userProfile.getUser(user_id)
    .then(payload => res.status(200).json(payload))
    .catch(err => {
      console.log(err);
      res.status(500);
    });
};

const getAllUsers = (req, res) => {
  req.app
    .get("db")
    .userProfile.getAllUsers()
    .then(payload => res.status(200).json(payload))
    .catch(err => {
      console.log(err);
      res.status(500);
    });
};

module.exports = {
  updateProfile,
  getUser,
  getAllUsers
};
