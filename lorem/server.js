require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const html = await fs.readFile(path.resolve(__dirname, 'public/index.html'), 'utf8');
    res.send(html);
  } catch (err) {
    res.status(500).send('Erro ao ler o arquivo index.html');
  }
});

app.get('/styles/styles.css', async (req, res) => {
  try {
    const css = await fs.readFile(path.resolve(__dirname, 'public/styles/styles.css'), 'utf8');
    res.header('Content-Type', 'text/css');
    res.send(css);
  } catch (err) {
    res.status(500).send('Erro ao ler o arquivo styles.css');
  }
});

app.get('/scripts/script.js', async (req, res) => {
  try {
    const js = await fs.readFile(path.resolve(__dirname, 'public/scripts/script.js'), 'utf8');
    res.header('Content-Type', 'application/javascript');
    res.send(js);
  } catch (err) {
    res.status(500).send('Erro ao ler o arquivo script.js');
  }
});

app.get('/paragraphs/:num', (req, res) => {
  const num = parseInt(req.params.num);
  if (isNaN(num)) {
    res.status(400).send('Número inválido');
    return;
  }
  
  let text = '';
  const fullLoremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  for (let i = 0; i < num; i++) {
    text += `<p>${fullLoremIpsum}</p>`;
  }
  res.send(text);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
