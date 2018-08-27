const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');

const app = express();

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

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});