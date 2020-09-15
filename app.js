import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import admin from './controller/admin/adminAPI.js';
import projectKind from './controller/projectKind/projectKindAPI.js';

dotenv.config({
  path: '.env',
});
const app = express();
const port = process.env.PORT;

// parse requests of content-type - application/json
// app.use(bodyParser.json

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
mongoose.Promise = global.Promise;

//parse body to json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' });
});

// handle routes
app.use('/', [admin, projectKind]);

//connect db and server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

export default app;