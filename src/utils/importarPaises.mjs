import axios from 'axios';
import mongoose from 'mongoose';
import Country from "../models/countryModel.mjs";
import { connectDB } from '../config/dbConfig.mjs';
import fs from 'fs';

try {
    // Conectar a la base
    await connectDB();
    console.log('Conexión exitosa a la base de datos');

    // Consumir API
    const { data } = await axios.get('https://restcountries.com/v3.1/region/america');

    if (!Array.isArray(data)) throw new Error('La API no devolvió un array válido');

    // Filtrar y limpiar países con idioma español
    const countriesFiltered = data
        .filter(country => country.languages?.spa)
        .map(pais => {
            const {
                translations, tld, cca2, ccn3, cca3, cioc, idd, altSpellings, car, coatOfArms,
                postalCode, demonyms, 
                ...countriesClear
            } = pais;

            return {
                ...countriesClear,
                creador: "Paola Gabriela Villafañez"
            };
        });

    console.log(`Total países filtrados: ${countriesFiltered.length}`);

    // Guardar JSON local
    fs.writeFileSync('countries_filtered.json', JSON.stringify(countriesFiltered, null, 2));
    console.log('Archivo guardado como countries_filtered.json');

    // Buscar duplicados en base de datos por nombre oficial
    const nombresOficialesFiltrados = countriesFiltered
        .map(pais => pais.name?.official)
        .filter(Boolean); // Eliminar nulos/undefined

    const paisesEnBaseDeDatos = await Country.find({
        "name.official": { $in: nombresOficialesFiltrados }
    }).lean();

    const nombresOficialesEnBase = new Set(
        paisesEnBaseDeDatos.map(pais => pais.name.official)
    );

    const paisesParaInsertar = countriesFiltered.filter(
        pais => !nombresOficialesEnBase.has(pais.name?.official)
    );

    if (paisesParaInsertar.length === 0) {
        console.log('No hay nuevos datos para importar.');
    } else {
        await Country.insertMany(paisesParaInsertar);
        console.log(`Se importaron ${paisesParaInsertar.length} nuevos registros.`);
    }

    await mongoose.disconnect();
    console.log('Desconectado de la base de datos');

    } catch (error) { 
        console.error('Error:', error.message); 
        process.exit(1); 
    }
