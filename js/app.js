// Selecciona los elementos del DOM necesarios para la funcionalidad
const lenghtSlider = document.querySelector('.pass-length input'), // Control deslizante para la longitud de la contraseña
    generateBtn = document.querySelector('.generate-btn'), // Botón para generar la contraseña
    passwordInput = document.querySelector('.input-box input'), // Campo de entrada para mostrar la contraseña generada
    options = document.querySelectorAll('.options input'), // Opciones de inclusión de caracteres
    passwordIndicator = document.querySelector('.pass-indicator'), // Indicador de la fortaleza de la contraseña
    copyIcon = document.querySelector('.input-box span'); // Icono para copiar la contraseña

// Objeto que contiene letras, números y símbolos para la contraseña
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz", // Letras minúsculas
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Letras mayúsculas
    numbers: "0123456789", // Números
    symbols: "^!$%&|{}:;.,*+-#@<>~" // Símbolos
};

// Función para generar la contraseña
const generatePassword = () => {
    let staticPassword = '', // Almacena los caracteres estáticos seleccionados
        randownPassword = '', // Almacena la contraseña aleatoria generada
        excludeDuplicate = false, // Bandera para excluir caracteres duplicados
        passLength = lenghtSlider.value; // Longitud de la contraseña deseada

    // Itera sobre las opciones de caracteres y los agrega a staticPassword
    [...options].map(option => {
        if (option.checked) {
            if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
                staticPassword += characters[option.id];
            } else if (option.id === 'spaces') {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            };
        };
    });

    // Genera la contraseña aleatoria basada en staticPassword
    for (let i = 0; i < passLength; i++) {
        let randomChart = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randownPassword.includes(randomChart) || randomChart == ' '
                ? randownPassword += randomChart
                : i--;
        } else {
            randownPassword += randomChart;
        };
    };
    passwordInput.value = randownPassword; // Asigna la contraseña generada al campo de entrada
};

// Función para actualizar el indicador de fortaleza de la contraseña
const updatePasswordIndicator = () => {
    passwordIndicator.id = lenghtSlider.value <= 8
        ? 'weak' // Contraseña débil
        : lenghtSlider.value <= 16
            ? 'medium' // Contraseña media
            : 'strong' // Contraseña fuerte
};

// Función para actualizar el control deslizante y la contraseña
const updateSlider = () => {
    document.querySelector('.pass-length span').textContent = lenghtSlider.value; // Muestra la longitud de la contraseña
    generatePassword(); // Genera una nueva contraseña
    updatePasswordIndicator(); // Actualiza el indicador de fortaleza
};

updateSlider(); // Llama a la función al cargar la página

// Función para copiar la contraseña al portapapeles
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); // Copia la contraseña
    copyIcon.textContent = 'check'; // Cambia el icono a 'check'

    // Restablece el icono después de 1.5 segundos
    setTimeout(() => { copyIcon.textContent = 'copy_all'; }, 1500)
};

// Event listeners para los elementos interactivos
lenghtSlider.addEventListener('input', updateSlider); // Actualiza al mover el control deslizante
generateBtn.addEventListener('click', generatePassword); // Genera contraseña al hacer clic
copyIcon.addEventListener('click', copyPassword); // Copia contraseña al hacer clic
