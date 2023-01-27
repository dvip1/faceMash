const express = require('express');
const app = express();
const ejs = require("ejs");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3000;
const homeRoute= require('./routes/router');
app.use(session({
	secret: 'nowThatsOurSecret',
	resave: false,
	saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/', homeRoute );
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
module.exports= app;