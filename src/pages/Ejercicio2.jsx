import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Ejercicio2() {
  const [form, setForm] = useState({ nombre: '', categoria: '', precio: '' });
  
  // Estado gestionado mediante objeto para controlar texto y tipo de alerta UI
  const [alerta, setAlerta] = useState({ texto: '', tipo: '' });
  
  // Instanciación del validador de formularios
  const [validator] = useState(new SimpleReactValidator({
    messages: {
      required: 'Este campo es obligatorio.',
      numeric: 'Debe ser un número válido.'
    }
  }));
  const [, forceUpdate] = useState();

  // Controlador bidireccional para los inputs del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Procesamiento del submit y envío de datos hacia Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta({ texto: '', tipo: '' }); // Limpieza de estado previo

    if (validator.allValid()) {
      try {
        await addDoc(collection(db, 'productosNuevos'), {
          nombre: form.nombre,
          categoria: form.categoria,
          precio: Number(form.precio)
        });

        setAlerta({ 
          texto: 'Producto guardado exitosamente en Firebase Database', 
          tipo: 'success' 
        });
        setForm({ nombre: '', categoria: '', precio: '' });
        validator.hideMessages();
      } catch (error) {
        console.error("Error en transacción:", error);
        setAlerta({ 
          texto: 'Error de conexión con Firebase. Verifique sus credenciales.', 
          tipo: 'danger' 
        });
      }
    } else {
      // Gatillado de mensajes de validación en caso de incumplimiento de reglas
      validator.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Registrar Nuevo Producto</h2>
        
        {/* Renderizado condicional de alertas Bootstrap */}
        {alerta.texto && (
          <div className={`alert alert-${alerta.tipo}`}>
            {alerta.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0 bg-light">
          
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre del Producto</label>
            <input 
              type="text" 
              className="form-control" 
              name="nombre" 
              value={form.nombre} 
              onChange={handleChange} 
              placeholder="Ej. Silla Gamer" 
            />
            <div className="text-danger" style={{ fontSize: '14px' }}>
              {validator.message('nombre', form.nombre, 'required')}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Categoría</label>
            <input 
              type="text" 
              className="form-control" 
              name="categoria" 
              value={form.categoria} 
              onChange={handleChange} 
              placeholder="Ej. Muebles" 
            />
            <div className="text-danger" style={{ fontSize: '14px' }}>
              {validator.message('categoría', form.categoria, 'required')}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Precio (CLP)</label>
            <input 
              type="text" 
              className="form-control" 
              name="precio" 
              value={form.precio} 
              onChange={handleChange} 
              placeholder="Ej. 150000" 
            />
            <div className="text-danger" style={{ fontSize: '14px' }}>
              {validator.message('precio', form.precio, 'required|numeric')}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Guardar en Firebase
          </button>
        </form>
      </div>
    </div>
  );
}