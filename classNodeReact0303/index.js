const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const routes = require('./routes/routes');

app.use(bodyparser.json());

app.use('/api', routes);

app.listen(3000, () => console.log('Server is running!!'));