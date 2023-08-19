const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { validateCreateUser, validatelogin } = require('../middlewares/validation');

const userRouter = require('./users');
const movieRouter = require('./movies');

router.use('/signin', validatelogin, login);
router.use('/signup', validateCreateUser, createUser);
router.use('/signout', logout);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => next(new NotFoundError('Страница не найдена!')));

module.exports = router;
