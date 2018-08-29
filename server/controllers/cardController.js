const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const cv = require("opencv4nodejs");

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
    let { name, team, year, collection } = fields;

    if (error) throw new Error(error);

    const path = files.file[0].path;
    const buffer = fs.readFileSync(path);
    const type = fileType(buffer);
    const timestamp = Date.now().toString();
    const fileName = `${timestamp}`;
    const data = await uploadFile(buffer, fileName, type, collection);

    let { kp, desc } = await mapTemplateImage(data.Location);

    let possibleMatch = await compareCards(req, collection[0], desc);

    if (possibleMatch && possibleMatch.matches.length > 50) {
      // let finalMatch = cv.drawMatches(cv.imread('./server/template.jpg'), possibleMatch.card, kp, possibleMatch.keyPoints, possibleMatch.matches);
      // cv.imwrite('./server/result.jpg', finalMatch);
      fs.unlink("./server/temp.jpg", err => console.log(err));
      fs.unlink("./server/template.jpg", err => console.log(err));
      res.send({
        message: "You already have this card!",
        image: possibleMatch.card.image
      });
    } else {
      fs.unlink("./server/temp.jpg", err => console.log(err));
      fs.unlink("./server/template.jpg", err => console.log(err));
      let cards = await req.app
        .get("db")
        .cards.create_card([
          name[0],
          team[0],
          year[0],
          data.Location,
          collection[0]
        ]);
      res.status(200).send(cards);
    }
  });
};

const getCards = (req, res) => {
  req.app
    .get("db")
    .cards.get_cards(req.params.collection_id)
    .then(cards => res.status(200).send(cards))
    .catch(err => console.log(err));
};

const compareCards = async (req, colId, desc1) => {
  let cards = await req.app.get("db").cards.get_cards(colId);
  let best = null;
  const sift = new cv.SIFTDetector();

  for (let c of cards) {
    let temp = await downloadImg(c.image, "temp");
    let card = cv.imread(temp);

    let kp2 = sift.detect(card);
    let desc2 = sift.compute(card, kp2);

    let matches = cv.matchKnnBruteForce(desc1, desc2, 2);

    let good = matches
      .filter(match => {
        return match[0].distance < 0.75 * match[1].distance;
      })
      .map(match => {
        return match[0];
      });

    if (best === null || good.length > best.matches.length) {
      console.log("NEW BEST: ", good.length);
      best = { card, matches: good, keyPoints: kp2 };
    }
  }

  return best;
};

const mapTemplateImage = url => {
  return new Promise(async (resolve, reject) => {
    let template = await downloadImg(url, "template");
    let card = cv.imread(template);

    const sift = new cv.SIFTDetector();
    let kp = await sift.detectAsync(card);

    let desc = await sift.computeAsync(card, kp);

    resolve({ kp, desc });
  });
};

const downloadImg = (url, fileName) => {
  var options = {
    directory: "./server",
    filename: `${fileName}.jpg`
  };

  var https = require("https");

  return new Promise((resolve, reject) => {
    var file = fs.createWriteStream(`./server/${fileName}.jpg`);
    var request = https.get(url, function(response) {
      response.pipe(file);
      response.on("end", () => {
        resolve(`./server/${fileName}.jpg`);
      });
    });
  });
};

const delCards = (req, res) => {
  req.app
    .get("db")
    .cards.delete_card([req.params.card_id])
    .then(collections => res.status(200).send(collections))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = {
  createCard,
  getCards,
  delCards
};
