'use strict';
const axios = require('axios');
const { response } = require('express');

module.exports = {
  async index(req, res) {
    const { username } = req.params;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`[*] Uma requisição à uma lista de repositórios de ${username} foi feita por: ${ip}`);

    axios({
      method: 'GET',
      url: `https://api.github.com/users/${username}/repos`
    })
      .then(response => {
        return res.send(response.data);

      })
      .catch(error => {
        if(error.response.status == 404) return res.status(404).send({
          error,
          msg: 'Este usuername não possui cadastro...'
        });

        return res.status(500).send({
          error,
          msg: 'Erro ao tentar efetuar requisição... Tente novamente mais tarde'
        });

      })

  }
}