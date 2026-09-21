# Examen-Final-Prog-Componentes
Examen Final de Programación de Componentes. Aplicación híbrida en React y Apache Cordova con integración de Firebase (Auth, Firestore y Storage).

**Alumno:** Francisco Culun
**Institución:** IPLACEX
**Asignatura:** Programación de Componentes

## Descripción del Proyecto
Esta es una aplicación web modular y responsiva construida con React, diseñada para demostrar competencias en el manejo de estados, componentes funcionales, integración de servicios en la nube (Firebase) y empaquetado móvil híbrido mediante Apache Cordova.

El proyecto está estructurado en tres módulos principales independientes para aislar funcionalidades.

## Tecnologías Utilizadas
* **Frontend:** React (Vite), JavaScript, Bootstrap 5.
* **Backend as a Service (BaaS):** Firebase (Authentication, Firestore, Storage).
* **Empaquetado Móvil:** Apache Cordova (Firma digital V2 y zipalign para Android).
* **Despliegue:** Netlify (Hosting web) y GitHub (Control de versiones).

## Módulos de la Aplicación
1. **Ejercicio 1 (Carrito de Compras):** Implementación de renderizado dinámico de productos y gestión de estado complejo para agregar elementos a un carrito.
2. **Ejercicio 2 (Formulario con Validación):** Captura de datos de usuario con validaciones de campos obligatorios mediante estados de React y alertas dinámicas.
3. **Ejercicio 3 (Auth & Storage):** Integración de Firebase. Cuenta con un sistema de registro/login y un "guardia de sesión" (onAuthStateChanged) que bloquea la vista de subida de archivos. Solo los usuarios autenticados pueden subir imágenes a Firebase Storage.

## Enlaces de Despliegue
* **Repositorio en GitHub:** https://github.com/franciscoculun/Examen-Final-Prog-Componentes.git
* **Aplicación en Vivo (Netlify):**