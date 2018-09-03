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

const addCollection = (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, async (error, fields, files) => {
    let { name, description, categoryId } = fields;

    if (error) throw new Error(error);

    const path = files.file[0].path;
    const buffer = fs.readFileSync(path);
    const type = fileType(buffer);
    const timestamp = Date.now().toString();
    const fileName = `${timestamp}`;
    const data = await uploadFile(buffer, fileName, type);

    req.app
      .get("db")
      .collections.add_collection([
        categoryId[0],
        req.user.user_id,
        name[0],
        description[0],
        data.Location
      ])
      .then(collections => res.send(collections))
      .catch(err => console.log(err));
  });
};

const deleteCollection = (req, res) => {
  let userId = req.user.user_id;
  console.log("***REQ PARAMS ***", req.params.collection_id);
  req.app
    .get("db")
    .collections.delete_collection([req.params.collection_id, userId])
    .then(collections => res.status(200).send(collections))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

const getCollections = (req, res) => {
  let userId = req.user.user_id;

  req.app
    .get("db")
    .collections.get_collections_by_user(userId)
    .then(collections => res.status(200).send(collections))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

const editCollection = (req, res) => {
  let userId = req.user.user_id;

  req.app
    .get("db")
    .collections.edit_collection([
      req.params.collection_id,
      req.body.name,
      userId
    ])
    .then(collections => res.status(200).send(collections))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

const getCategories = async (req, res) => {
  let categories = await req.app.get("db").collections.get_categories();
  res.status(200).send(categories);
};

module.exports = {
  addCollection,
  deleteCollection,
  getCollections,
  editCollection,
  getCategories
};
