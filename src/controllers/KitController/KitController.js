import { DatabaseModel } from '../../models/index.js'

export function getKits(req, res){
    const db = new DatabaseModel()
    db.pool.getConnection((err, conn)=>{
        if(err) return res.json(err)
        conn.query(
            `SELECT
            kits.producto_id AS product_id,
            kits.kit_nombre AS product_name,
            kits.kit_precio AS product_price,
            kits.kit_imagen AS product_image,
            kits.categoria_id AS category_id,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'imagen_id', imagenes.id_imagen,
                'imagen_ruta', imagenes.url_imagen
                )
            ) as images
            FROM
            kits
            LEFT JOIN
            imagenes ON imagenes.producto_id = kits.producto_id
            GROUP BY
            kits.kit_id;
            `,
        (err, rows)=>{
            if(err) return res.json(err)
            return res.json(rows)
        })
    })
}