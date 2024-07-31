const router = require('express').Router();

const add = require('../components/address/add');
const update = require('../components/address/update');
const getUserAddress = require('../components/address/get.user.address');
const removeAddress = require('../components/address/remove');

router.post('/',add);
router.get('/:user_id',getUserAddress);
router.put('/:address_id',update);
router.delete('/:address_id',removeAddress);

module.exports = router;