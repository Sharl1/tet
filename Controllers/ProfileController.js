const pool = require('../db')

class ProfileController {

    async getAllProfile(req, res) {
        try {
            const post = await pool.query(`SELECT * FROM Profile`)
            res.json(post.rows)
        } catch (error) {
            console.log(error)
        }
    }

 async createProfile(req, res){
    const {name, surname, patronymic, old} = req.body
    try {
        const post = await pool.query(`INSERT INTO Profile (name, surname, patronymic, old) VALUES ($1, $2, $3, $4) RETURNING *`, [name, surname, patronymic, old]);
        res.json(post.rows);
    }catch (error) {
        console.error('error', error)
    }
 }

 async updateProfile(req, res) {
    const id = parseInt(req.params.id, 10);
    const {name, surname, patronymic, old} = req.body
    try {
        const post = await pool.query(`UPDATE Profile SET name = $1, surname = $2, patronymic = $3, old = $4 WHERE id = $5 RETURNING *`, [name, surname, patronymic, old, id]);
        res.json(post.rows);
    }catch (error){
        console.error('error', error)
    }
 }

 async deleteProfile(req, res) {
    const id = req.params.id;
    const post = await pool.query(`DELETE FROM Profile WHERE id = $1`, [id])
        res.json(post.rows[0]);
 }

}
module.exports = new ProfileController();