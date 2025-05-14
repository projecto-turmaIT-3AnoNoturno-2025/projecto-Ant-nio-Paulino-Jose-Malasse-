// server/routes.js
const express = require('express');
const router = express.Router();

router.post('/mensagem', (req, res) => {
  const { mensagem } = req.body;
  res.json({ resposta: `Você disse: ${mensagem}` });
});

module.exports = router;
