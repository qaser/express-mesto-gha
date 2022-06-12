const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req) => {
  req.statusCode(404).send({ message: 'Данный путь не найден' });
});

module.exports = router;
