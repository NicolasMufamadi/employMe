const router = require('express').Router();
const create = require('../components/application/create');
const getByUser = require('../components/application/getByUser');

router.post('/',create);
router.get('/:user_id',getByUser)

module.exports = router;