import { DatabaseModel } from '../../models/index.js'

export function getBags(req, res){
    const db = new DatabaseModel()
    db.pool.getConnection((err, conn)=>{
        if(err) return res.json(err)
        conn.query(
            `SELECT
            bolsos.producto_id AS product_id,
            bolsos.bolso_nombre AS product_name,
            bolsos.bolso_precio AS product_price,
            bolsos.bolso_imagen AS product_image,
            bolsos.categoria_id AS category_id,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'imagen_id', imagenes.id_imagen,
                'imagen_ruta', imagenes.url_imagen
                )
            ) as images
            FROM
            bolsos
            LEFT JOIN
            imagenes ON imagenes.producto_id = bolsos.producto_id
            GROUP BY
            bolsos.bolso_id;
            `,
        (err, rows)=>{
            if(err) return res.json(err)
            return res.json(rows)
        })
    })
}