const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

router.use((req) => {
  req.status(404).send({ message: 'Данный путь не найден' });
});

module.exports = router;
