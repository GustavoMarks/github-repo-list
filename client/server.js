const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT|| 3000;

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log(`[*] Servidor em execução na porta ${port}`);