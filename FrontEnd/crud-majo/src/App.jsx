// src/App.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL+'/products'

console.log(API_URL)

function App() {
  const [productos, setProductos] = useState([])
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' })
  const [editandoId, setEditandoId] = useState(null)

  const obtenerProductos = async () => {
    const res = await axios.get(API_URL)
    setProductos(res.data)
  }

  useEffect(() => {
    obtenerProductos()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editandoId) {
      await axios.put(`${API_URL}/${editandoId}`, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      })
      setEditandoId(null)
    } else {
      await axios.post(API_URL, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      })
    }
    setFormData({ name: '', price: '', stock: '' })
    obtenerProductos()
  }

  const handleEditar = (producto) => {
    setFormData({
      name: producto.name,
      price: producto.price,
      stock: producto.stock
    })
    setEditandoId(producto.id)
  }

  const handleEliminar = async (id) => {
    if (confirm('¿Deseas eliminar este producto?')) {
      await axios.delete(`${API_URL}/${id}`)
      obtenerProductos()
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">CRUD de Productos</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input name="name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" required step="0.01" />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">
          {editandoId ? 'Actualizar' : 'Crear'}
        </button>
        {editandoId && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => {
            setEditandoId(null)
            setFormData({ name: '', price: '', stock: '' })
          }}>
            Cancelar
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(p)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
