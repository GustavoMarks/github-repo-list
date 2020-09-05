const express = require('express');
const router = express.Router();
const GitHubMiddleaware = require('./GitHubMiddleware');

router.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`[*] Uma requisição à raiz da aplicaçãoo foi feita por: ${ip}`);

  return res.send({
    description: 'API para listagem de respositórios de um usuário do GitHub',
    version: '1.0.0',
    author: 'GustavoMarks'
  })
});
router.get('/github-repos/:username', GitHubMiddleaware.index);

module.exports = router;