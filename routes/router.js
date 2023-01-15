const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const teacherArr = require('../Database/data');
const _= require('lodash');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const elo = require('../func/elo');
//declaring variables for  iterating;
const i = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 3, 5];
const j = [7, 6, 5, 4, 6, 5, 4, 7, 5, 4, 7, 6, 4, 7, 6, 5, 3, 2, 7, 6];
router.get('/', (req, res) => {
    res.render('welcome');
});
router.post('/', (req, res) => {
    req.session.name = req.body.name;
    console.log(req.session.name);
    res.redirect('/round1');
})
router.get('/round1', (req, res) => {
    //creating arrays, variables if they don't  exists
    if (req.session.teacherArr == undefined)
        req.session.teacherArr = teacherArr;
    if (req.session.counter == undefined)
        req.session.counter = 0
    // redirecting using conditions
    if (req.session.counter > j.length-1)
        res.redirect('/round2');
    if (req.session.name == '') res.redirect('/');

    res.render('round1', { name: req.session.name, teacherArr: req.session.teacherArr, pointer: i[req.session.counter], secPointer: j[req.session.counter] });
})
router.post('/round1', (req, res) => {
    //temp variables for increasing the 'score'
    req.session.loserP = (i[req.session.counter] == req.body.winner) ? j[req.session.counter] : i[req.session.counter];
    req.session.winnerP = req.body.winner;
    req.session.objectElo = new elo(req.session.teacherArr[req.session.winnerP].score, req.session.teacherArr[req.session.loserP].score, 1);

    //increasing the score
    req.session.teacherArr[req.session.winnerP].score += req.session.objectElo.newRatingA;
    req.session.teacherArr[req.session.loserP].score += req.session.objectElo.newRatingB;

    //redirecting using condition
    if (req.session.counter > i.length-1)
        res.redirect('/round2');
    else {
        req.session.counter++;
        res.redirect('/round1');
    }
})
router.get('/round2', (req, res) => {
    if (req.session.name == "")
        res.redirect('/');
    req.session.sorted= _.sortBy(req.session.teacherArr,['score']);
    res.render('round2', {name: req.session.name, sorted: req.session.sorted});
    console.log(req.session.teacherArr);
})
module.exports = router;