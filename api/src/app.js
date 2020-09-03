'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Router = require('./controllers/Router');

//Configurando aplicação
const app = express();
const corsOptions = {
  "origin": (process.env.ORIGIN || "*"),
  "exposedHeaders": "*"
}

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(Router);

module.exports = app;