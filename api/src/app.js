'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Configurando aplicação
const app = express();
const corsOptions = {
  "origin": (process.env.ORIGIN || "*"),
  "exposedHeaders": "*"
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

module.exports = app;