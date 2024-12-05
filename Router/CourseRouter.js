const Router = require('express')
const router = new Router()
const CourseController = require('../Controllers/CourseController')

router.get('/course', CourseController.getAllCourse)
router.post('/course', CourseController.createCourse)
router.put('/course/:id', CourseController.updateCourse)
router.delete('/course/:id', CourseController.deleteCourse)

module.exports = router