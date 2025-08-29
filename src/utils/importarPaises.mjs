//importarPaises.mjs
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
                // Nombre oficial en español
                    name: {
                        official: pais.translations?.spa?.official || pais.name?.official || "Sin nombre"
                    },
      
                    // Capital: tomamos la primera si es array
                    capital: Array.isArray(pais.capital) ? pais.capital : [],
      
                    borders: pais.borders || [],
                    area: pais.area || 0,
                    population: pais.population || 0,

                    // Gini: valor numérico más reciente si existe
                    gini: pais.gini ? pais.gini[Object.keys(pais.gini)
                                .map(Number).sort((a, b) => a - b).pop()
                            ] 
                        : null,

                    
                    // Timezones: lista completa
                    timezones: pais.timezones || [],
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
    
        const CREADOR = "Paola Gabriela Villafañez";

    const paisesEnBaseDeDatos = await Country.find({
        "name.official": { $in: nombresOficialesFiltrados },
        creador: CREADOR
    }).lean();

    const nombresOficialesEnBase = new Set(
        paisesEnBaseDeDatos.map(pais => pais.name.official)
    );

    const paisesParaInsertar = countriesFiltered
    .map(pais => ({
        ...pais,
        creador: CREADOR
    }))
    .filter(pais => !nombresOficialesEnBase.has(pais.name?.official));

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
