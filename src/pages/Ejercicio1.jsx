import React, { Component } from 'react';
import ProductoHijo from '../components/ProductoHijo';

export default class Ejercicio1 extends Component {
  constructor(props) {
    super(props);
    // Inicialización del estado del componente de clase
    this.state = {
      carrito: [],
      productos: [
        { id: 1, nombre: 'Teclado Mecánico', descripcion: 'Switches Red, iluminación RGB', precio: 45000 },
        { id: 2, nombre: 'Mouse Gamer', descripcion: 'Sensor óptico 10.000 DPI, 6 botones', precio: 25000 },
        { id: 3, nombre: 'Monitor 144Hz', descripcion: '24 pulgadas, panel IPS', precio: 150000 }
      ]
    };
  }

  // Callback inyectado mediante props para gestionar la comunicación desde el componente hijo
  agregarAlCarrito = (producto) => {
    // Actualización inmutable del estado utilizando this.setState
    this.setState((prevState) => ({
      carrito: [...prevState.carrito, producto]
    }));
  }

  render() {
    // Cálculo de la sumatoria total del carrito de compras
    const total = this.state.carrito.reduce((sum, item) => sum + item.precio, 0);

    return (
      <div>
        <h2 className="mb-4 text-center">Catálogo de Productos</h2>
        
        {/* Panel de métricas del carrito de compras */}
        <div className="alert alert-info d-flex justify-content-between align-items-center shadow-sm">
          <h5 className="mb-0">Productos en el carrito: <strong>{this.state.carrito.length}</strong></h5>
          <h5 className="mb-0">Total: <strong>${total.toLocaleString()}</strong></h5>
        </div>

        {/* Iteración de arreglos para el renderizado dinámico de componentes */}
        <div className="row mt-4">
          {this.state.productos.map((producto) => (
            <ProductoHijo 
              key={producto.id} 
              producto={producto} 
              onAgregar={this.agregarAlCarrito} 
            />
          ))}
        </div>
      </div>
    );
  }
}