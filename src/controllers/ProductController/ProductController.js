import { DatabaseModel } from '../../models/index.js'

export function getProducts(req, res){
    const db = new DatabaseModel()
    db.pool.getConnection((err, conn)=>{
        if(err) return res.json(err)
        conn.query('SELECT * FROM products', (err, rows)=>{
            if(err) return res.json(err)
            return res.json(rows)
        })
    })
}