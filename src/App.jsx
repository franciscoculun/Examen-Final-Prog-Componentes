import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Ejercicio1 from './pages/Ejercicio1';
import Ejercicio2 from './pages/Ejercicio2';
import Ejercicio3 from './pages/Ejercicio3';

export default function App() {
  return (
    <div>
      {/* Menú de Navegación con Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold">Examen Final - Francisco Culun</span>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">Ejercicio 1</Link>
            <Link className="nav-link" to="/ejercicio2">Ejercicio 2</Link>
            <Link className="nav-link" to="/ejercicio3">Ejercicio 3</Link>
          </div>
        </div>
      </nav>

      {/* Contenedor principal */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Ejercicio1 />} />
          <Route path="/ejercicio2" element={<Ejercicio2 />} />
          <Route path="/ejercicio3" element={<Ejercicio3 />} />
        </Routes>
      </div>
    </div>
  );
}