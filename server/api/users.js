const router = require('express').Router();
const { Link, User } = require('../db/models');

module.exports = router;

router.get('/friends/', function (req, res, next) {
  const email = 'elisabeth.seite@gmail.com'
  User.find({
    where: {
      email: email
    }
  })
    .then(user => {
      res.json(user.friends)})
    .catch(next);
});


router.get('/:email', function (req, res, next) {
  const email = req.params.email
  User.findOrCreate({
    where: {
      email: email
    }
  })
    .then(user => {
      res.json(user[0])})
    .catch(next);
});


router.post('/', function(req, res, next){
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
