const pool = require('../db')

class UserController {

    async getAllUser(req, res) {
        try {
            const post = await pool.query(`SELECT * FROM Users`)
            res.json(post.rows)
        } catch (error) {
            console.log(error)
        }
    }

 async createUser(req, res){
    const {role, email, password} = req.body
    try {
        const post = await pool.query(`INSERT INTO Users (role, email, password) VALUES ($1, $2, $3) RETURNING *`, [role, email, password]);
        res.json(post.rows);
    }catch (error) {
        console.error('error', error)
    }
 }

 async updateUser(req, res) {
    const id = parseInt(req.params.id, 10);
    const {role, email, password} = req.body
    try {
        const post = await pool.query(`UPDATE Users SET role = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`, [role, email, password, id]);
        res.json(post.rows);
    }catch (error){
        console.error('error', error)
    }
 }

 async deleteUser(req, res) {
    const id = req.params.id;
    const post = await pool.query(`DELETE FROM Users WHERE id = $1`, [id])
        res.json(post.rows[0]);
 }

}
module.exports = new UserController();