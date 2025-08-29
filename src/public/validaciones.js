// public/validaciones.js
console.log("validaciones cargadas");

const form = document.querySelector('.add'); // la clase del form

form.addEventListener('submit', function (e) {

    // === Nombre oficial ===
    const nombreInput = document.getElementById('nombre'); // <input id="nombre">
    const nombre = nombreInput.value.trim();

    if (!nombre) {
        alert("El campo 'Nombre oficial' es obligatorio.");
        e.preventDefault();
        return;
    }

    if (nombre.length < 3 || nombre.length > 90) {
        alert("El 'Nombre oficial' debe tener entre 3 y 90 caracteres.");
        e.preventDefault();
        return;
    }

    // === Capital (puede ser varias separadas por coma) ===
    const capitalInput = document.getElementById('capital');
    const capitalTexto = capitalInput.value.trim();

    if (!capitalTexto) {
        alert("El campo 'Capital' es obligatorio.");
        e.preventDefault();
        return;
    }

    const capitalArray = capitalTexto.split(',').map(c => c.trim());
    for (let cap of capitalArray) {
        if (cap.length < 3 || cap.length > 90) {
            alert(`La capital "${cap}" debe tener entre 3 y 90 caracteres.`);
            e.preventDefault();
            return;
        }
    }

    // === Fronteras ===
    const bordersInput = document.getElementById('borders');
    const bordersTexto = bordersInput.value.trim();

    if (bordersTexto) {
        const bordersArray = bordersTexto.split(',').map(b => b.trim());
        for (let code of bordersArray) {
            if (!/^[A-Z]{3}$/.test(code)) {
                alert(`El código de frontera "${code}" debe ser exactamente 3 letras mayúsculas.`);
                e.preventDefault();
                return;
            }
        }
    }

    // === Área ===
    const areaInput = document.getElementById('area');
    const area = Number(areaInput.value);

    if (isNaN(area) || area <= 0) {
        alert("El campo 'Área' es obligatorio y debe ser un número positivo.");
        e.preventDefault();
        return;
    }

    // === Población ===
    const populationInput = document.getElementById('population');
    const population = Number(populationInput.value);

    if (!Number.isInteger(population) || population <= 0) {
        alert("La 'Población' es obligatoria y debe ser un número entero positivo.");
        e.preventDefault();
        return;
    }

    // === Gini (opcional) ===
    const giniInput = document.getElementById('gini');
    const gini = giniInput.value.trim();

    if (gini) {
        const giniNum = Number(gini);
        if (isNaN(giniNum) || giniNum < 0 || giniNum > 100) {
            alert("El índice Gini (si se ingresa) debe estar entre 0 y 100.");
            e.preventDefault();
            return;
        }
    }

    
});
