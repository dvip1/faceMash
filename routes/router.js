const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const teacherArr = require('../Database/data');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', (req, res) => {
    res.render('welcome');
});
router.post('/', (req, res) => {
    req.session.name = req.body.name;
    console.log(req.session.name);
    res.redirect('/round1');
})
router.get('/round1', (req, res) => {
    if (req.session.teacherArr == undefined)
        req.session.teacherArr = teacherArr
    if (req.session.pointer + 2 >= req.session.teacherArr)
        res.redirect('/round2');
    if (req.session.name == '') res.redirect('/');
    if (req.session.master == undefined)
        req.session.master = [];
    if (req.session.pointer == undefined)
        req.session.pointer = 0;
    res.render('round1', { name: req.session.name, teacherArr: req.session.teacherArr, pointer: req.session.pointer })
})
router.post('/round1', (req, res) => {
	req.session.master.push(req.session.teacherArr[req.body.winner]);
	req.session.master[req.session.master.length - 1].score += 1;
	if (req.session.pointer + 2 >= req.session.teacherArr.length) {
		res.redirect('/round2');
	}
	else {
		req.session.pointer += 2;
		res.redirect('/round1');
	}
})
router.get('/round2', (req, res) => {
	if(req.session.name=="")
	res.redirect('/');
	res.render('round2');
	console.log(req.session.master);
})
module.exports = router;