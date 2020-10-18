const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(pino);
app.use(cors())
//app.use((req, res) =>res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'))

app.get('/hello', (req, res) => {
    res.send('HELLO')
});

app.get('/countries', (req, res) => {
  const countries = ['Choose','France', 'Usa','Israel','Germany','Italy','Mexico','Greece'];
  res.send(countries);
})

app.post('/', (req, res) => {
  if(req.body != null) {
    if (req.body.street != null) {
      res.status(200).end()
    } else {
      res.status(400).end()
    }
  } else {
    res.status(400).end()
  }
});

/*app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});*/

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);