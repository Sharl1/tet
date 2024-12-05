const Router = require('express')
const router = new Router()
const ProfileController = require('../Controllers/ProfileController')

router.get('/profile', ProfileController.getAllProfile)
router.post('/profile', ProfileController.createProfile)
router.put('/profile/:id', ProfileController.updateProfile)
router.delete('/profile/:id', ProfileController.deleteProfile)

module.exports = router