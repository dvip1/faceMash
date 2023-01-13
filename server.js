const express = require('express');
const app = express();
const ejs = require("ejs");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3000;
const ip = '192.168.225.170';
var name = '';
var pointer = 0;
app.use(session({
	secret: 'nowThatsOurSecret',
	resave: false,
	saveUninitialized: false
}));
const teacherArr = [
	{
		name: "Manjiri Ma'am",
		sex: "female",
		sub: "Electronic Devices"
	}
	, {
		name: "Sheetal Ma'am",
		sex: "female",
		sub: "Skill lab"
	},
	{
		name: "Abhijit Sir",
		sex: "male",
		sub: "DSA"
	},
	{
		name: "Aarti Ma'am",
		sex: "female",
		sub: "ED lab"
	},
	{
		name: "Tanvi Ma'am",
		sex: "female",
		sub: "ED lab"
	},
	{
		name: "Kalai Ma'am",
		sex: "female",
		sub: "Engineering Maths III"
	},
	{
		name: "Khusbu Ma'am",
		sex: "female",
		sub: "DBMS"
	},
	{
		name: "Rashmi Ma'am",
		sex: "female",
		sub: "Digital electronics"
	}];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get('/', (req, res) => {
	res.render('welcome');
})
app.get('/round1', (req, res) => {
	// console.log("req.session.pointer "+ typeof(req.session.pointer))
	if(req.session.pointer==undefined)
	req.session.pointer=0;
	// if (req.session.pointer ==0 || req.session.pointer==NaN)
	if (req.session.views) {
		req.session.views++;
	} else {
		req.session.views = 1;
	}
	console.log(req.session.views)
	res.render('round1', { name: name, teacherArr: teacherArr, pointer: req.session.pointer })
})
app.listen(port, ip, () => {
	console.log(`Server running on port ${ip + ":" + port}`)
})
app.post('/', (req, res) => {
	name = req.body.name;
	console.log(name);
	res.redirect('/round1');
})
app.post('/round1', (req, res) => {
	if (req.session.pointer + 2 >= teacherArr.length) {
		console.log("it's working");
	}
	else {
		console.log('increasing pointer')
		req.session.pointer += 2;
		res.redirect('/round1')
	}
})
