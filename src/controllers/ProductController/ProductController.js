import { DatabaseModel } from '../../models/index.js'

export function getProducts(req, res){
    const db = new DatabaseModel()
    db.pool.getConnection((err, conn)=>{
        if(err) return res.json(err)
        conn.query(
        `SELECT
        products.product_id,
        products.product_name,
        products.product_price,
        products.product_color,
        products.product_image,
        products.category_id,
        products.model_id,
        JSON_ARRAYAGG(
            JSON_OBJECT(
            'imagen_id', imagenes.image_id,
            'imagen_ruta', imagenes.image_name
            )
        ) as images
        FROM
        products
        LEFT JOIN
        imagenes ON imagenes.product_id = products.product_id;`,
        (err, rows)=>{
            if(err) return res.json(err)
            return res.json(rows)
        })
    })
}