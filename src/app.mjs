// ==================== IMPORTACIONES ====================

import express from 'express'; // Framework web principal de Node.js para crear el servidor

import path from 'path'; // Módulo nativo de Node.js para trabajar con rutas de archivos

import expressLayouts from 'express-ejs-layouts'; // Permite usar layouts (plantillas padre) con EJS

import { fileURLToPath } from 'url'; // Función para convertir URLs de ES Modules a rutas de archivos

import { connectDB } from './config/dbConfig.mjs'; // Tu función personalizada para conectar a MongoDB

//import countryRoutes from './routes/countryRoutes.mjs'; // Rutas para el CRUD de países (Create, Read, Update, Delete)

import methodOverride from 'method-override'; // Permite simular métodos HTTP PUT y DELETE en formularios HTML

import session from 'express-session'; // Manejo de sesiones de usuario (login, datos temporales, etc.)

// ==================== CREACIÓN DE LA APLICACIÓN ====================

const app = express(); 
// 👉 Primero creás la app
// Crea la instancia principal de Express que manejará todas las peticiones

// ==================== CONFIGURACIÓN DE RUTAS DE ARCHIVOS ====================

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url); 
// Obtiene el nombre completo del archivo actual

const __dirname = path.dirname(__filename);
// Extrae solo el directorio (sin el nombre del archivo)
// En CommonJS esto existía automáticamente, en ES Modules hay que recrearlo

const PORT = 3000;
// Puerto donde va a correr el servidor (hardcodeado)
// ⚠️ MEJOR PRÁCTICA: Usar process.env.PORT || 3000

// ==================== CONFIGURACIÓN DEL MOTOR DE PLANTILLAS ====================

//Configuración EJS como motor de vistas en Express
app.set('view engine', 'ejs');
// Le dice a Express que use EJS para renderizar las vistas HTML

app.set('views', path.join(__dirname, 'views'));
// Define que las plantillas están en la carpeta './views'

// Configurar express-ejs-layouts
app.use(expressLayouts);
// Activa el sistema de layouts (plantillas padre reutilizables)

app.set('layout', 'layout'); 
// Archivo base de layout
// Buscará './views/layout.ejs' como plantilla base para todas las páginas

// ==================== MIDDLEWARES DE EXPRESS ====================

// MIDDLEWARES
app.use(express.static(path.resolve('./public')));
// Sirve archivos estáticos (CSS, JavaScript, imágenes, etc.) 
// desde la carpeta './public'

app.use(express.json());
// Middleware que parsea (convierte) JSON en el body de las peticiones POST/PUT
// Ejemplo: { "name": "Argentina" } → req.body.name = "Argentina"

app.use(express.urlencoded({ extended: true }));
// Middleware que parsea datos de formularios HTML
// Ejemplo: name=Argentina&capital=Buenos Aires → req.body.name = "Argentina"

app.use(methodOverride('_method'));
// Permite usar PUT/DELETE en formularios HTML agregando ?_method=PUT
// Los formularios HTML solo soportan GET y POST nativamente

// ==================== SESIONES DUPLICADAS (PROBLEMA) ====================

app.use(session({
  secret: 'secretoSuperSecreto',     // ❌ CLAVE DIFERENTE a la de arriba
  resave: false,
  saveUninitialized: true
}));
// 🚨 PROBLEMA CRÍTICO: Esta configuración SOBRESCRIBE la primera
// Solo la segunda tendrá efecto, la primera se ignora completamente
// Además, usar diferentes secretos puede causar problemas de sesión

// ==================== CONEXIÓN A BASE DE DATOS ====================

// Conexión a MongoDB
connectDB();
// Ejecuta tu función de conexión a MongoDB
// ⚠️ PROBLEMA: No maneja errores ni espera que se complete la conexión
// Si falla la conexión, la app seguirá funcionando pero sin base de datos

// ==================== CONFIGURACIÓN DE RUTAS API ====================

// Configuración de rutas
//app.use('/api', countryRoutes);
// Todas las rutas de países estarán bajo '/api'
// Ejemplo: si countryRoutes tiene GET '/countries', será accesible en GET '/api/countries'

// ==================== RUTAS DE PÁGINAS WEB ====================

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Página Principal' });
});
// Página de inicio: cuando alguien va a http://localhost:3000/
// Renderiza './views/index.ejs' pasándole la variable 'title'

// Ruta para la Lista de países
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Lista de países' });
});
// Dashboard: http://localhost:3000/dashboard
// Renderiza './views/dashboard.ejs' con la lista de países

// Ruta para la página agregar país
app.get('/addCountry', (req, res) => {
  res.render('addCountry', { title: 'Agregar País' });
});
// Formulario para crear país: http://localhost:3000/addCountry
// Renderiza './views/addCountry.ejs'

// Ruta para la página Acerca de
app.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de Nosotros' });
});
// Página informativa: http://localhost:3000/about
// Renderiza './views/about.ejs'

// Ruta para la página de Contacto
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contáctanos' });
});
// Página de contacto: http://localhost:3000/contact
// Renderiza './views/contact.ejs'

// ==================== MANEJO DE ERRORES ====================

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});
// Este middleware se ejecuta cuando ninguna ruta anterior coincide
// ⚠️ INCONSISTENCIA: Devuelve JSON, pero el resto de la app usa vistas EJS
// Debería renderizar una página 404.ejs

// ==================== INICIO DEL SERVIDOR ====================

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
// Inicia el servidor HTTP en el puerto 3000
// El callback se ejecuta cuando el servidor está listo para recibir peticiones

// ==================== RESUMEN DE LA APLICACIÓN ====================

/*
🎯 PROPÓSITO: Aplicación web full-stack para gestionar información de países

📁 ARQUITECTURA:
   - Frontend: Páginas web con EJS (/, /dashboard, /addCountry, /about, /contact)
   - Backend API: Rutas REST bajo /api (para AJAX/fetch desde el frontend)
   - Base de datos: MongoDB (conectada via dbConfig.mjs)
   - Archivos estáticos: CSS, JS, imágenes desde /public

🔄 FLUJO TÍPICO:
   1. Usuario visita /dashboard (página web con lista de países)
   2. JavaScript en la página hace fetch a /api/countries (API)
   3. API consulta MongoDB y devuelve JSON con países
   4. JavaScript actualiza la página con los datos de países

📋 FUNCIONALIDADES:
   ✅ Ver lista de países
   ✅ Agregar nuevo país  
   ✅ Editar país existente (via API)
   ✅ Eliminar país (via API)
   ✅ Páginas informativas (about, contact)
*/

// ==================== PROBLEMAS A CORREGIR ====================

/*
❌ CRÍTICO - Configuración de session duplicada (líneas 13-17 y 42-46)
❌ CRÍTICO - Diferentes secretos de sesión pueden causar errores
❌ INCONSISTENCIA - 404 devuelve JSON en vez de página web
⚠️  HARDCODING - Puerto 3000 fijo, debería usar variables de entorno
⚠️  SIN VALIDACIÓN - connectDB() no valida si la conexión fue exitosa
⚠️  SEGURIDAD - Secretos de sesión hardcodeados en el código

✅ POSITIVO - Separación clara entre API (/api) y vistas web
✅ POSITIVO - Uso correcto de middlewares y su orden
✅ POSITIVO - Implementación correcta de EJS con layouts
✅ POSITIVO - Estructura de rutas bien organizada
*/

// ==================== ESTRUCTURA DE ARCHIVOS ESPERADA ====================

/*
📁 proyecto/
  📁 config/
    📄 dbConfig.mjs          -> Configuración de MongoDB
  📁 routes/
    📄 countryRoutes.mjs     -> Rutas CRUD de países (/api/countries)
  📁 views/
    📄 layout.ejs            -> Plantilla base
    📄 index.ejs             -> Página principal
    📄 dashboard.ejs         -> Lista de países
    📄 addCountry.ejs        -> Formulario crear país
    📄 about.ejs             -> Página acerca de
    📄 contact.ejs           -> Página contacto
  📁 public/
    📁 css/
    📁 js/
    📁 images/
  📄 app.mjs                 -> Este archivo
*/