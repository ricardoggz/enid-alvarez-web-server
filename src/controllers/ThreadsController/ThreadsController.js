import { DatabaseModel } from '../../models/index.js'

export function getThreads(req, res){
    const db = new DatabaseModel()
    db.pool.getConnection((err, conn)=>{
        if(err) return res.json(err)
        conn.query(
            `SELECT
            hilos.producto_id AS product_id,
            hilos.hilo_nombre AS product_name,
            hilos.hilo_precio AS product_price,
            hilos.hilo_imagen AS product_image,
            hilos.categoria_id AS category_id,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'imagen_id', imagenes.id_imagen,
                'imagen_ruta', imagenes.url_imagen
                )
            ) as images
            FROM
            hilos
            LEFT JOIN
            imagenes ON imagenes.producto_id = hilos.producto_id
            GROUP BY
            hilos.hilo_id;
            `,
        (err, rows)=>{
            if(err) return res.json(err)
            return res.json(rows)
        })
    })
}