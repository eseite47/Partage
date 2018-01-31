const router = require('express').Router();
const { Link, User } = require('../db/models');

module.exports = router;

router.get('/friends/', function (req, res, next) {
  const email = "elisabeth.seite@gmail.com"
  console.log('checking friends', email)
  User.find({
    where: {
      email: email
    }
  })
    .then(user => {
      //console.log('Did it find my friends?', user)
      res.json(user.friends)})
    .catch(next);
});


router.get('/:email', function (req, res, next) {
  const email = req.params.email
  console.log('checking user', email)
  User.findOrCreate({
    where: {
      email: email
    }
  })
    .then(user => {
      //console.log('Found this about the user', user)
      res.json(user[0])})
    .catch(next);
});


router.post('/', function(req, res, next){
  //console.log('want to create', req.body)
  Link.create(req.body)
  .then(res.sendStatus(200))
})

router.put('/:email', function(req, res, next) {
  User.find({
    where: {
      email: req.params.email
    }
  })
  .then(user => {
    user.update(req.body)
  })
  .then(
    res.sendStatus(200)
  )
})
