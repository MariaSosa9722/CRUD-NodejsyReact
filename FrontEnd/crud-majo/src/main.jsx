import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>

 <div className="d-flex justify-content-center align-items-center min-vh-100">
    <div className="w-100" style={{ maxWidth: '600px' }}>
         <App />
    </div>
  </div>
    

  </StrictMode>,
)
