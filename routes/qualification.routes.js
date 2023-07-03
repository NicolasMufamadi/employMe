const router = require('express').Router();

const add = require('../components/qualification/add');
const getUserQualifications = require('../components/qualification/get.user.qualification');
const deleteQualification = require('../components/qualification/delete');
const getByQualificationId = require('../components/qualification/get.by.qualicfication.id');
const update = require('../components/qualification/update');
const getall = require('../components/qualification/getAll');

router.post('/',add);
//router.get('/',getall);
router.get('/:user_id',getUserQualifications);
router.get('/:qualification_id',getByQualificationId);
router.put('/:qualification_id',update); 
router.delete('/:qualification_id',deleteQualification);

module.exports = router;