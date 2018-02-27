const router = require('express').Router();
const { Link, User } = require('../db/models');

module.exports = router;

// GET api/channels
router.get('/', function (req, res, next) {
  Link.findAll()
    .then(links => res.json(links))
    .catch(next);
});

router.get('/:email', function (req, res, next) {
  const email = req.params.email
  Link.findAll({
    where: {
      receiver: email
    }
  })
    .then(links => {
      res.json(links)})
    .catch(next);
});


router.post('/', function(req, res, next){
  Link.create(req.body)
  .then(res.sendStatus(200))
})

router.delete('/:id', function(req, res, next){
  console.log('DESTROYING!', req.params.id)
  Link.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(res.send(200))
})
