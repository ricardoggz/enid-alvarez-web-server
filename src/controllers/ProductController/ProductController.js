import { DatabaseModel } from "../../models/index.js";

export function getProducts(req, res) {
  const db = new DatabaseModel();
  db.pool.getConnection((err, conn) => {
    if (err) return res.json(err);
    conn.query(
      `SELECT 
        productos.producto_id as product_id,
        productos.nombre_producto as product_name,
        (
          SELECT bolso_precio
          FROM bolsos
          WHERE bolsos.bolso_id = productos.producto_id
        ) as bag_price,
        (
          SELECT hilo_precio
          FROM hilos
          WHERE hilos.producto_id = productos.producto_id
        ) as thread_price,
        (
            SELECT bolso_imagen
            FROM bolsos
            WHERE bolsos.producto_id = productos.producto_id
        ) as bag_image,
        (
            SELECT hilo_imagen
            FROM hilos
            WHERE hilos.producto_id = productos.producto_id
        ) as thread_image,
        JSON_ARRAYAGG(JSON_OBJECT(
        'imagen_id', imagenes.id_imagen,
        'imagen_ruta', imagenes.url_imagen
        )) as images
        FROM productos
        LEFT JOIN imagenes ON productos.producto_id = imagenes.producto_id
        GROUP BY productos.producto_id, productos.nombre_producto;     
        `,
      (err, rows) => {
        if (err) return res.json(err);
        return res.json(rows);
      }
    );
  });
}
