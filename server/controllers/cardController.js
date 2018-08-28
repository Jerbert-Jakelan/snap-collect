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

const uploadFile = (buffer, name, type, colId) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `collection-${colId}/${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

const createCard = (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    let {name, team, year, collection} = fields;

    if (error) throw new Error(error);

    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `${timestamp}`;
      const data = await uploadFile(buffer, fileName, type, collection);

      req.app.get('db').cards.create_card([name[0], team[0], year[0], data.Location, collection[0]])
        .then(cards => res.status(200).send(cards))
        .catch(err => console.log(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  });
}

const getCards = (req, res) => {
  req.app.get('db').cards.get_cards(req.params.collection_id)
    .then(cards => res.status(200).send(cards))
    .catch(err => console.log(err));
}

module.exports = {
  createCard,
  getCards
}