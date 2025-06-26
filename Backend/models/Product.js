const db = require('../config/db');

class Product {
  
    static async getAll() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  }

  
  // Ejemplo con procedimiento almacenado
  // static async getAll() {
  //   const [rows] = await db.query('CALL `spGetproducts`(); ');
  //   return rows[0];
  // }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(name, price, stock) {
    const [result] = await db.query(
      'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
      [name, price, stock]
    );
    return { id: result.insertId, name, price, stock };
  }

  static async update(id, name, price, stock) {
    await db.query(
      'UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?',
      [name, price, stock, id]
    );
    return { id, name, price, stock };
  }

  static async delete(id) {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Product;