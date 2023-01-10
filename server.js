const express = require('express');
const app = express();
const ejs = require("ejs");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const port = 3000;
const ip = '172.17.0.1';
var name = '';
const teacherArr = ["Manjiri Ma'am", "Sheetal Ma'am", "Abhijit(DSA) Sir", "Aarti Ma'am", "Tanvi Ma'am", "Kalai Ma'am", "Khusbu Ma'am", "Rashmi Ma'am"];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get('/', (req, res) => {
	res.render('welcome');
})
app.get('/round1', (req, res) => {
	res.render('round1', { name: name, teacherArr:teacherArr})
})
app.listen(port, ip, () => {
	console.log(`Server running on port ${ip + ":" + port}`)
})
app.post('/', (req, res) => {
	name = req.body.name;
	console.log(name);
	res.redirect('/round1');
})
