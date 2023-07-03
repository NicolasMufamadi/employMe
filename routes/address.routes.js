const router = require('express').Router();

const add = require('../components/address/add');
const update = require('../components/address/update');
const getUserAddress = require('../components/address/get.user.address');

router.post('/',add);
router.get('/:user_id',getUserAddress);
router.put('/:address_id',update);

module.exports = router;