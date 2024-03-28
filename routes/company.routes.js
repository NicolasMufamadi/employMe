const router = require('express').Router()

const uploadImage = require('../components/company/add-company-logo')
const addCompany = require('../components/company/add-company')
const removeCompany = require('../components/company/remove-company')
const changeCompanyName = require('../components/company/change-name')
const changeCompanyManager = require('../components/company/change-manager')
const changeCompanyLogo = require('../components/company/change-logo')
const getCompany = require('../components/company/get-company')
const getCompanies = require('../components/company/get-companies')

router.post('/',addCompany)
router.post('/upload',uploadImage)
router.get('/',getCompanies)
router.get('/:id',getCompany)
router.patch('/:id',changeCompanyName)
router.patch('/change-logo/:id',changeCompanyLogo)
router.patch('/change-manager/:id',changeCompanyManager)
router.delete('/:id',removeCompany)

module.exports = router
