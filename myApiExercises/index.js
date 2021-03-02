require('dotenv').config();
const express = require('express');
const app = express();
const route = require('./routes/routes');



app.use('/api', route);


const port = process.env.SERVER_PORT || 3000;
app.listen(port, ()=>console.log(`Running at port ${port}`));