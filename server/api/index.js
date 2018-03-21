const router = require('express').Router();
module.exports = router;

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE")
  next();
})

router.use('/links', require('./links'));
router.use('/users', require('./users'));

router.use((req, res, next) => {
  res.status(404).send('Not found');
});
