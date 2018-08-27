const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');

const app = express();

const colController = require('./controllers/collectionsController');

const port = 3001;

require('dotenv').config();

massive(process.env.DB_CONNECTION)
  .then(db => {
    app.set('db', db);
    console.log('Database connected');
    app.get('db').build_schema()
      .then(() => console.log('Schema built'))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

app.use(json());

app.post('/api/collections', colController.addCollection);
app.delete('/api/collections/:collection_id', colController.deleteCollection);
app.get('/api/collections', colController.getCollections);
app.put('/api/collections/:collection_id', colController.editCollection);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});