const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  userAvatarValid,
  parameterIdValid,
  userValid,
} = require('../middlewares/validationJoi');

const {
  getUsers,
  getUserById,
  getUserMe,
  // createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', auth, getUserMe);
// router.post('/', createUser);
router.get('/:userId', auth, parameterIdValid('userId'), getUserById);
router.patch('/me', auth, userValid, updateUser);
router.patch('/me/avatar', auth, userAvatarValid, updateUserAvatar);

module.exports = router;
