'use strict';
const axios = require('axios');
require('../../envConfig');

const token = process.env.GITHUB_TOKEN == 'false' ? false : process.env.GITHUB_TOKEN;

module.exports = {
  async index(req, res) {
    const { username } = req.params;
    const { page } = req.query;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`[*] Uma requisição à uma lista de repositórios de ${username} foi feita por: ${ip}`);

    axios({
      method: 'GET',
      url: `https://api.github.com/users/${username}/repos`,
      params: page ? { page }: null,
      headers: {
        'Authorization': token ? `token ${token}` : null
      }
    })
      .then(response => {
        const limit = response.headers['x-ratelimit-limit'];
        const used = response.headers['x-ratelimit-used'];
        const link = response.headers['link'];

        if (link) {
          try {
            const lastPage = link.split('>;')[1].split('page=')[1]
            res.header('X-Last-Page', parseInt(lastPage));

          } catch {
            console.log('[*] Falha ao tentar acessar total de páginas...');
          }
        }

        console.log(`[*] Requisição realizada com sucesso (${used}/${limit})`)
        return res.send(response.data);

      })
      .catch(error => {
        const { status } = error.response;
        console.log(`[*] Requisição falhou (${status})`);

        if (status == 404) return res.status(404).send({
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