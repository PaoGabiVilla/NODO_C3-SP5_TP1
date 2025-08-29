//NODO_C3-SP5_TP1/src/app.mjs
import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import { connectDB } from './config/dbConfig.mjs';
import paisesRoutes from './routes/paisesRoutes.mjs';
import methodOverride from 'method-override';
import session from 'express-session';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 3000;


//CONFIGURACIÓN DE EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(expressLayouts);
app.set('layout', 'layout');

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true
}));

// CONEXIÓN A LA BASE DE DATOS
connectDB();

// RUTAS
app.use('/api', paisesRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard de Paises' });
});

app.get('/addPaises', (req, res) => {
  res.render('addPaises', { title: 'Editar Paises' });
});
app.get('/acercade', (req, res) => {
  res.render('acercade', { title: 'Acerca de' });
});

// MANEJO DE RUTA NO ENCONTRADA
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});