Documentación


Objetivos

• Desarrollar una aplicación web con Node.js, Express y MongoDB para gestionar países hispanohablantes.
• Consumir datos desde la API externa https://restcountries.com/v3.1/region/america.
• Filtrar países que tengan español como idioma, limpiarlos y almacenarlos en MongoDB.
• Implementar un Dashboard con operaciones CRUD y validaciones.

Características principales

• Obtención automática de datos: Importa países de América que tengan el español como idioma oficial, a través de una API externa.
• Procesamiento y depuración: Filtra únicamente la información relevante, descartando campos innecesarios.
• Persistencia en base de datos: Guarda los países en MongoDB con un esquema que incluye: nombre oficial, capital, fronteras, superficie, población, índice Gini, zonas horarias y autor del registro.
• Interfaz web dinámica: Presenta un dashboard con listado de países.
• Operaciones CRUD: Permite agregar, modificar y eliminar países de manera interactiva.
• Validaciones robustas:
    - Nombre oficial entre 3 y 90 caracteres.
    - Capitales con un rango de 3 a 90 caracteres.
    - Fronteras definidas con códigos de 3 letras mayúsculas.
    - Área y población deben ser valores positivos.
    - Gini debe estar entre 0 y 100.
• Gestión de errores: Mensajes claros y conservación de datos en formularios ante entradas inválidas.
• Control de duplicados: Impide registrar un mismo país más de una vez por creador.

Tecnologías usadas

• Node.js – Entorno de ejecución JavaScript.
• Express – Framework para servidor web.
• MongoDB/Mongoose – Base de datos NoSQL y ODM para modelar datos.
• Axios – Consumo de API externa.
• EJS – Motor de plantillas para renderizar vistas dinámicas.
• express-validator – Validación de datos en rutas.
• method-override – Para soportar métodos PUT y DELETE desde formularios.

Dependencias instaladas

• npm init: inicializa el proyecto y crea el archivo package.json.
• npm install: instala todas las dependencias listadas en package.json.
• npm install express: framework para crear el servidor y manejar rutas REST.
• npm install jest: framework para realizar pruebas automatizadas.
• npm install eslint: herramienta para análisis de código y buenas prácticas.
• npm update: actualiza las dependencias a sus últimas versiones compatibles.
• npm install mongoose: ODM para interactuar con MongoDB.
• npm install express-ejs-layouts: soporte de layouts al usar EJS en las vistas.
• npm install express-validator: validación de datos en el backend.
• npm install method-override: permite usar métodos HTTP PUT y DELETE en formularios HTML.
• npm install axios: cliente HTTP para consumir APIs externas.
• npm install express-session: manejo de sesiones en la aplicación.
• npm install ejs: motor de plantillas para vistas dinámicas.


Iniciar servidor

• npm start
• Acceder a http://localhost:3000.




