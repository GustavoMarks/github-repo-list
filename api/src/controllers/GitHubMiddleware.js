'use strict';
const axios = require('axios');
const { response } = require('../app');

module.exports = {
  async index(req, res){
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`[*] Uma requisição à uma lista de repositórios foi feita por: ${ip}`);

    const {username} = req.params;
    axios({
      method: 'GET',
      url: `https://api.github.com/users/${username}/repos`
    })
    .then(response => {
      if(response.data.message == 'Not Found') return res.sendStatus(404);
      return res.send(response.data);

    })
    .catch(error => {
      return res.status(500).send({
        error,
        msg: 'Erro ao tentar efetuar requisição... Tente novamente mais tarde'
      });

    })

  }
}