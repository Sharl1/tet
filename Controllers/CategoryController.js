const pool = require('../db')

class CategoryController {

    async getAllCategory(req, res) {
        try {
            const post = await pool.query(`SELECT * FROM Category`)
            res.json(post.rows)
        } catch (error) {
            console.log(error)
        }
    }

 async createCategory(req, res){
    const {category_name} = req.body
    try {
        const post = await pool.query(`INSERT INTO Category (category_name) VALUES ($1) RETURNING *`, [category_name]);
        res.json(post.rows);
    }catch (error) {
        console.error('error', error)
    }
 }

 async updateCategory(req, res) {
    const id = parseInt(req.params.id, 10);
    const {category_name} = req.body
    try {
        const post = await pool.query(`UPDATE Category SET category_name = $1 WHERE id = $2 RETURNING *`, [category_name, id]);
        res.json(post.rows);
    }catch (error){
        console.error('error', error)
    }
 }

 async deleteCategory(req, res) {
    const id = req.params.id;
    const post = await pool.query(`DELETE FROM Category WHERE id = $1`, [id])
        res.json(post.rows[0]);
 }

}
module.exports = new CategoryController();