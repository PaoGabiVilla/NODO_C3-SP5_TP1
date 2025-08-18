// responseView.mjs - Adaptado a Sprint 5 con nombre oficial en español

export function renderizarPais(pais) {
  return {
    "Nombre Oficial (Español)": 
      pais.name?.nativeName?.spa?.official || // preferimos el oficial en español
      //pais.translations?.spa?.official ||     // fallback traducciones
      pais.name?.official,                    // fallback al oficial genérico
    "Capital": pais.capital ? pais.capital.join(", ") : "N/A",
    "Fronteras": pais.borders ? pais.borders.join(", ") : "Sin fronteras",
    "Área (km²)": pais.area,
    "Población": pais.population,
    "Índice Gini": pais.gini ? pais.gini : "N/A",
    "Zona Horaria": pais.timezones ? pais.timezones.join(", ") : "N/A",
    "Creador": pais.creador
  };
}

export function renderizarListaPaises(paises) {
  return paises.map(pais => renderizarPais(pais));
}
