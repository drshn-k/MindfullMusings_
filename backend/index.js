// express 
const express = require('express');
const app = express();
const port = 3000;
// cors
const cors = require('cors');
// mongoose
const mongoose = require('mongoose');
// dotenv
require('dotenv').config();
// routes
const routes = require('./routes');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

// routes
app.use('/', routes);

// listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`));