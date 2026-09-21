import React from 'react';

export default function ProductoHijo({ producto, onAgregar }) {
  return (
    <div className="col-md-4 mb-4">
      {/* Tarjeta con diseño de Bootstrap */}
      <div className="card h-100 shadow-sm border-0 bg-light">
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{producto.nombre}</h5>
          <p className="card-text text-muted">{producto.descripcion}</p>
          <h4 className="text-primary mb-3">${producto.precio.toLocaleString()}</h4>
          
          {/* Comunicación Hijo a Padre: Llama a la función onAgregar */}
          <button 
            className="btn btn-success w-100"
            onClick={() => onAgregar(producto)}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}