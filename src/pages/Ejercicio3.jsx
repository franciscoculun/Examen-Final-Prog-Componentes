import React, { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../firebaseConfig';

export default function Ejercicio3() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [archivo, setArchivo] = useState(null);
  
  // Estados para controlar la sesión y las notificaciones
  const [usuario, setUsuario] = useState(null);
  const [alerta, setAlerta] = useState({ texto: '', tipo: '' });

  // Hook para verificar permanentemente el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userActual) => {
      if (userActual) {
        setUsuario(userActual);
      } else {
        setUsuario(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Función combinada para Login y Registro
  const manejarAutenticacion = async (e, esRegistro) => {
    e.preventDefault();
    setAlerta({ texto: '', tipo: '' });

    try {
      if (esRegistro) {
        await createUserWithEmailAndPassword(auth, email, password);
        setAlerta({ texto: 'Cuenta creada y sesión iniciada exitosamente', tipo: 'success' });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setAlerta({ texto: 'Sesión iniciada exitosamente', tipo: 'success' });
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setAlerta({ texto: 'Error de autenticación. Verifique sus credenciales.', tipo: 'danger' });
    }
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    setAlerta({ texto: 'Sesión cerrada', tipo: 'info' });
    setArchivo(null);
  };

  // Función para subir archivo a Firebase Storage
  const subirArchivo = async () => {
    if (!archivo) {
      setAlerta({ texto: 'Por favor selecciona un archivo primero', tipo: 'warning' });
      return;
    }
    
    setAlerta({ texto: 'Subiendo archivo...', tipo: 'info' });

    try {
      const archivoRef = ref(storage, `uploads/${archivo.name}`);
      await uploadBytes(archivoRef, archivo);
      setAlerta({ texto: 'Archivo subido con éxito a Firebase Storage', tipo: 'success' });
      setArchivo(null);
    } catch (error) {
      console.error(error);
      setAlerta({ texto: 'Error al subir el archivo. (Verifique reglas de Storage o CORS)', tipo: 'danger' });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Auth & Storage</h2>
        
        {alerta.texto && (
          <div className={`alert alert-${alerta.tipo} mb-4`}>
            {alerta.texto}
          </div>
        )}

        {/* RENDERIZADO CONDICIONAL: Si no hay usuario, muestra Auth. Si hay usuario, muestra Storage */}
        {!usuario ? (
          <div className="card p-4 shadow-sm border-0 bg-light">
            <h4 className="mb-3">Ingreso al Sistema</h4>
            <form>
              <input 
                type="email" 
                className="form-control mb-2" 
                placeholder="Correo electrónico" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                className="form-control mb-3" 
                placeholder="Contraseña (mín. 6 caracteres)" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <div className="d-flex gap-2">
                <button 
                  onClick={(e) => manejarAutenticacion(e, false)} 
                  className="btn btn-primary w-50 fw-bold"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={(e) => manejarAutenticacion(e, true)} 
                  className="btn btn-outline-dark w-50 fw-bold"
                >
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="card p-4 shadow-sm border-0 bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Gestor de Archivos</h4>
              <button onClick={cerrarSesion} className="btn btn-sm btn-danger">Cerrar Sesión</button>
            </div>
            
            <p className="text-muted small">Autenticado como: <strong>{usuario.email}</strong></p>
            
            <input 
              type="file" 
              className="form-control mb-3" 
              onChange={(e) => setArchivo(e.target.files[0])} 
            />
            <button onClick={subirArchivo} className="btn btn-success w-100 fw-bold">
              Subir Archivo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}