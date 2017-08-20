const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// DATABASE CONFIGURATION
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/papers', (request, response) => {
  database('papers').select()
    .then(papers => {
      response.status(200).json(papers);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/papers', (request, response) => {
  const newPaper = request.body;

  for (let requiredParameter of ['title']) {
    if (!newPaper[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      });
    }
  }

  database('papers').insert(newPaper, 'id')
    .then(paper => {
      response.status(201).json({ id: paper[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/footnotes', (request, response) => {
  database('footnotes').select()
    .then(footnotes => {
      response.status(200).json(footnotes);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});