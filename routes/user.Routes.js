const router = require('express').Router();

const auth = require('../components/middleware/auth');
const add = require('../components/user/add');
const _delete = require('../components/user/delete');
const getAll = require('../components/user/getAll');
const getById = require('../components/user/getById');
const login = require('../components/user/login');
const update = require('../components/user/update');

router.post('/',add);
router.post('/login',login);
router.get('/auth',auth)
router.get('/',getAll);
router.get('/:user_id',getById);
router.put('/:user_id',update);
router.delete('/:user_id',auth,_delete);

module.exports = router;