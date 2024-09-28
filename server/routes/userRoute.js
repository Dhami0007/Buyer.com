const userControl = require('../controllers/userControl');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.post('/register', userControl.register);
router.post('/refresh_token', userControl.refreshToken);
router.post('/login', userControl.login);
router.get('/logout', userControl.logout);
router.get('/infor', auth, userControl.getUser);

// router.post('/refresh_token', userControl.refreshToken);
module.exports = router;