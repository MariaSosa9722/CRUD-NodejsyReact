const Product = require('../models/Product');

// Crear tabla al iniciar

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, price, stock } = req.body;
      if (!name || price === undefined || stock === undefined) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const newProduct = await Product.create(name, price, stock);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, price, stock } = req.body;
      if (!name || price === undefined || stock === undefined) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const updatedProduct = await Product.update(req.params.id, name, price, stock);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      await Product.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
};

module.exports = productController;