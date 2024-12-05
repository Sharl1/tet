const pool = require('../db')

class CourseController {

    async getAllCourse(req, res) {
        try {
            const post = await pool.query(`SELECT * FROM Course`)
            res.json(post.rows)
        } catch (error) {
            console.log(error)
        }
    }

 async createCourse(req, res){
    const {course_name, teacher, object, description, photo, duration, category} = req.body
    try {
        const post = await pool.query(`INSERT INTO Course(course_name, teacher, object, description, photo, duration, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [course_name, teacher, object, description, photo, duration, category]);
        res.json(post.rows);
    }catch (error) {
        console.error('error', error)
    }
 }

 async updateCourse(req, res) {
    const id = parseInt(req.params.id, 10);
    const {course_name, teacher, object, description, photo, duration, category} = req.body
    try {
        const post = await pool.query(`UPDATE Course SET course_name = $1, teacher = $2, object = $3, description = $4, photo = $5, duration = $6, category = $7 WHERE id = $8 RETURNING *`, [course_name, teacher, object, description, photo, duration, category, id]);
        res.json(post.rows);
    }catch (error){
        console.error('error', error)
    }
 }

 async deleteCourse(req, res) {
    const id = req.params.id;
    const post = await pool.query(`DELETE FROM Course WHERE id = $1`, [id])
        res.json(post.rows[0]);
 }

}
module.exports = new CourseController();