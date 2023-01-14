const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const teacherArr = require('../Database/data');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const  elo = require ('../func/elo');
const winnerLoser  = require('../func/winnerLoser');
router.get('/', (req, res) => {
    res.render('welcome');
});
router.post('/', (req, res) => {
    req.session.name = req.body.name;
    console.log(req.session.name);
    res.redirect('/round1');
})
router.get('/round1', (req, res) => {
    //creating arrays if doesn't already exists
    if (req.session.teacherArr == undefined)
        req.session.teacherArr = teacherArr
    if (req.session.pointer + 2 >= req.session.teacherArr)
        res.redirect('/round2');
    if (req.session.name == '') res.redirect('/');
    if (req.session.master == undefined)
        req.session.master = [];
    if (req.session.loser == undefined)
        req.session.loser = [];
    if (req.session.pointer == undefined)
        req.session.pointer = 0;
    res.render('round1', { name: req.session.name, teacherArr: req.session.teacherArr, pointer: req.session.pointer })
})
router.post('/round1', (req, res) => {
    //variables
    let objectWL = new winnerLoser(req.body.winner);
    let loserP= objectWL.loser;
    console.log("\n\n"+ loserP);
    let winnerP = req.body.winner;
    let objectElo= new elo(req.session.teacherArr[winnerP].score, req.session.teacherArr[loserP].score, 1)
    let winnerScrInc =objectElo.newRatingA;
    let loserScoreDec = objectElo.newRatingB;

    //adding, pushing into arrray 
    req.session.master.push(req.session.teacherArr[winnerP]);
    req.session.loser.push(req.session.teacherArr[loserP]);

    req.session.loser[req.session.loser.length - 1].score = loserScoreDec;
    req.session.master[req.session.master.length - 1].score = winnerScrInc;
    //redirecting using condition
    if (req.session.pointer + 2 >= req.session.teacherArr.length) {
        res.redirect('/round2');
    }
    else {
        req.session.pointer += 2;
        res.redirect('/round1');
    }
})
router.get('/round2', (req, res) => {
    if (req.session.name == "")
        res.redirect('/');
    res.render('round2');
    console.log(req.session.master);
    console.log(req.session.loser)
})
module.exports = router;