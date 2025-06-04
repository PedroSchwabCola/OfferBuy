const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Coloque sua chave da API do Gemini aqui:
const API_KEY = "AIzaSyAFyGaG3qB9-zHwuFz8NDDVXe3Ho_0p-fU";

app.use(cors());
app.use(bodyParser.json());

app.post('/gemini', async (req, res) => {
  const userInput = req.body.text;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userInput }] }]
    })
  });

  const data = await response.json();

  try {
    const resposta = data.candidates[0].content.parts[0].text;
    res.json({ resposta });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao processar a resposta da IA.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
