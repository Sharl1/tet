const Router = require('express')
const router = new Router()
const RecordController = require('../Controllers/RecordController')

router.get('/record', RecordController.getAllRecord)
router.post('/record', RecordController.createRecord)
router.put('/record/:id', RecordController.updateRecord)
router.delete('/record/:id', RecordController.deleteRecord)

module.exports = router