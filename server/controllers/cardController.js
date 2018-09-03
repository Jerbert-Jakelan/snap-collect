const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const cv = require("opencv4nodejs");
const jo = require('jpeg-autorotate')
const sharp = require('sharp');
const s3Client = require('s3');

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
    
    const options = {quality: 85}

    jo.rotate(buffer, options, async function(error, buffer, orientation, dimensions) {
      if (error) {
        console.log('An error occurred when rotating the file: ' + error.message)
      }

      await sharp(buffer)
      .resize(500)
      .toFile('./server/template.jpg');

      let jpegData = fs.readFileSync('./server/template.jpg');
      
      let desc = await mapTemplateImage();
      
      let possibleMatch = await compareCards(collection[0], desc);
      
      if (possibleMatch && possibleMatch.matches.length > 500) {
        // let finalMatch = cv.drawMatches(cv.imread('./server/template.jpg'), possibleMatch.card, kp, possibleMatch.keyPoints, possibleMatch.matches);
        // cv.imwrite('./server/result.jpg', finalMatch);
        fs.rmdirSync(`./server/temp-${collection[0]}`);
        fs.unlinkSync('./server/template.jpg');
        res.send({
          message: "You already have this card!",
          image: possibleMatch.card.image
        });
      } else {
        fs.rmdirSync(`./server/temp-${collection[0]}`);
        fs.unlinkSync('./server/template.jpg');
        const data = await uploadFile(jpegData, fileName, type, collection);
        let cards = await req.app
          .get("db")
          .cards.create_card([
            name[0],
            team[0],
            year[0],
            data.Location,
            parseInt(collection[0], 10),
            data.Key
          ]);
        res.status(200).send(cards);
      }
    })
  });
};

const getCards = (req, res) => {
  req.app
    .get("db")
    .cards.get_cards(req.params.collection_id)
    .then(cards => res.status(200).send(cards))
    .catch(err => console.log(err));
};

const compareCards = (colId, desc1) => {  
  let best = null;
  return new Promise((resolve, reject) => {
    downloadImgs(colId).then(cards => {
      const sift = new cv.SIFTDetector();
      for (let c of cards) {
        let card = cv.imread(`./server/temp-${colId}/${c}`);
    
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
  
        fs.unlinkSync(`./server/temp-${colId}/${c}`)
      }
    
      resolve(best);
    });
  });

};

const mapTemplateImage = () => {
  return new Promise(async (resolve, reject) => {
    let card = cv.imread('./server/template.jpg');

    const sift = new cv.SIFTDetector();
    let kp = await sift.detectAsync(card);

    let desc = await sift.computeAsync(card, kp);

    resolve(desc);
  });
};

const downloadImgs = colId => {
  var client = s3Client.createClient({
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  const p = {
    Bucket: process.env.S3_BUCKET,
    Prefix: `collection-${colId}`
  };

  const params = {
    s3Params: p,
    localDir: `./server/temp-${colId}`
  };

  if (!fs.existsSync(`./server/temp-${colId}`)){
    fs.mkdirSync(`./server/temp-${colId}`);
  }

  return new Promise((resolve, reject) => {
    let downloads = client.downloadDir(params);
  
    downloads.on('error', function(err) {
      console.error("unable to download: ", err);
      reject();
    });
  
    downloads.on('end', () => {
      resolve(fs.readdirSync(`./server/temp-${colId}`));
    });
  });
};
/////////////////////////////
const delCards = async (req, res) => {
  let card = await req.app.get('db').cards.get_card_by_id(req.params.card_id);

  req.app
    .get("db")
    .cards.delete_card([req.params.card_id, req.params.collection_id])
    .then(cards => res.status(200).send(cards))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

    var params = {
      Bucket: process.env.S3_BUCKET, /* required */
      Key: card[0].aws_key, /* required */
    };

    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });
};
/////////////////////////////
module.exports = {
  createCard,
  getCards,
  delCards
};
