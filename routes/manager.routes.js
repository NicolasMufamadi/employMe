const router = require('express').Router()

const update = require('../components/manager/update')
const addRecruiter = require('../components/manager/add-recruiter')

router.post('/:id',addRecruiter)
router.patch('/:id',update)

module.exports = router 