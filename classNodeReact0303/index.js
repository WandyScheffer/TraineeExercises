const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const routes = require('./routes/routes');

app.use(bodyparser.json());

app.use((req, res, next) => {
    let acceptedFormats = ['application/json', 'application/xml'];
    let requestedFormat = req.header('Accept');

    if (requestedFormat === '*/*') {
        requestedFormat = 'application/json';
    }

    if (!(acceptedFormats.some(item => item===requestedFormat))) {
        res.status(406).send({message: "Content type is not supported!"});
        return;
    }
    res.setHeader('Content-Type', requestedFormat);
    next();
});

app.use('/api', routes);

app.listen(3000, () => console.log('Server is running!!'));