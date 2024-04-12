const router = require('express').Router();

const auth = require('../components/middleware/auth');
const add = require('../components/user/add');
const _delete = require('../components/user/delete');
const getAll = require('../components/user/getAll');
const getById = require('../components/user/getById');
const login = require('../components/user/login');
const update = require('../components/user/update');
const update_password = require('../components/user/changePasword');
const otp = require('../components/user/otp');
const verifyOTP = require('../components/user/verifyOtp');

router.post('/',add);
router.post('/login',login);
router.get('/auth',auth)
router.post('/otp',otp);
router.post('/verifyotp',verifyOTP);
router.get('/',getAll);
router.get('/:user_id',getById);
router.patch('/:user_id',update);
router.patch('/change-password/:user_id',update_password);
router.delete('/:user_id',_delete);

module.exports = router;