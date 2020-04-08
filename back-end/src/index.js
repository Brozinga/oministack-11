const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const client = require('prom-client')
const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics({ timeout: 1000 })

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType)
    res.end(client.register.metrics())
  })

app.listen(3333);