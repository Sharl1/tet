const pool = require('../db')

class RecordController {

    async getAllRecord(req, res) {
        try {
            const post = await pool.query(`SELECT * FROM Record`)
            res.json(post.rows)
        } catch (error) {
            console.log(error)
        }
    }

 async createRecord(req, res){
    const {users, course_id, course_name} = req.body
    try {
        const post = await pool.query(`INSERT INTO Record (users, course_id, course_name) VALUES ($1, $2, $3) RETURNING *`, [users, course_id, course_name]);
        res.json(post.rows);
    }catch (error) {
        console.error('error', error)
    }
 }

 async updateRecord(req, res) {
    const id = parseInt(req.params.id, 10);
    const {users, course_id, course_name} = req.body
    try {
        const post = await pool.query(`UPDATE Record SET users = $1, course_id = $2, course_name = $3, WHERE id = $4 RETURNING *`, [users, course_id, course_name, id]);
        res.json(post.rows);
    }catch (error){
        console.error('error', error)
    }
 }

 async deleteRecord(req, res) {
    const id = req.params.id;
    const post = await pool.query(`DELETE FROM Record WHERE id = $1`, [id])
        res.json(post.rows[0]);
 }

}
module.exports = new RecordController();