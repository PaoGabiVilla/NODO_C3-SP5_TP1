//NODO_C3-SP5_TP1/src/config/dbConfig.mjs
//Conexión a MongoDB
import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://Grupo-06:grupo06@cursadanodejs.ls9ii.mongodb.net/Node-js');
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}