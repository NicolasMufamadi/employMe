const router = require('express').Router();

const create = require('../components/jobs/create');
const getAll = require('../components/jobs/all');

router.post('/',create);
router.get('/',getAll);


module.exports = router;