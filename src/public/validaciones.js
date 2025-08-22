// public/validaciones.js
console.log("validaciones cargadas")
const form = document.querySelector('.add'); // la clase del form

form.addEventListener('submit', function (e) {

    // === Nombre oficial ===
    const nombreInput = document.getElementById('nameOfficial');
    const nombre = nombreInput.value.trim();

    if (!nombre) {
        alert("El campo 'Nombre oficial' es requerido.");
        e.preventDefault();
        return;
    }

    if (nombre.length < 3 || nombre.length > 90) {
        alert("El 'Nombre oficial' debe tener entre 3 y 90 caracteres.");
        e.preventDefault();
        return;
    }

    // === Capital ===
    const capitalInput = document.getElementById('capital');
    const capital = capitalInput.value.trim();

    if (!capital) {
        alert("El campo 'Capital' es requerido.");
        e.preventDefault();
        return;
    }

    if (capital.length < 3 || capital.length > 90) {
        alert("La 'Capital' debe tener entre 3 y 90 caracteres.");
        e.preventDefault();
        return;
    }

    // === Fronteras ===
    const bordersInput = document.getElementById('borders');
    const bordersTexto = bordersInput.value.trim();

    if (bordersTexto) {
        const bordersArray = bordersTexto.split(',').map(b => b.trim());

        for (let i = 0; i < bordersArray.length; i++) {
            let code = bordersArray[i];

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
        alert("El campo 'Área' debe ser un número positivo.");
        e.preventDefault();
        return;
    }

    // === Población ===
    const populationInput = document.getElementById('population');
    const population = Number(populationInput.value);

    if (!Number.isInteger(population) || population <= 0) {
        alert("La 'Población' debe ser un número entero positivo.");
        e.preventDefault();
        return;
    }

    // === Gini (opcional) ===
    const giniInput = document.getElementById('gini');
    const gini = giniInput.value.trim();

    if (gini) {
        const giniNum = Number(gini);
        if (isNaN(giniNum) || giniNum < 0 || giniNum > 100) {
            alert("El índice Gini debe estar entre 0 y 100.");
            e.preventDefault();
            return;
        }
    }

    // ✅ Si todo pasa, se envía normalmente
});
