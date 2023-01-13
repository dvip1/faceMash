const express = require('express');
const app = express();
const ejs = require("ejs");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3000;
const ip = '192.168.225.222';
const homeRoute= require('./routes/router');
// const round1Route= require('./routes/one');
app.use(session({
	secret: 'nowThatsOurSecret',
	resave: false,
	saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/', homeRoute );
app.listen(port, ip, () => {
	console.log(`Server running on port ${ip + ":" + port}`)
})
module.exports= app;