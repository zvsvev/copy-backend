const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

let pastes = {};

app.use(cors());
app.use(bodyParser.json());

app.post('/api/paste', (req, res) => {
  const id = Math.random().toString(36).substr(2, 8);
  pastes[id] = req.body.text;
  res.json({ url: `https://copy.ulinnuha.id/paste.html?id=${id}` });
});

app.get('/api/paste/:id', (req, res) => {
  const text = pastes[req.params.id];
  if (text) {
    res.json({ text });
  } else {
    res.status(404).json({ error: 'Paste not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
