
const lenghtSlider = document.querySelector('.pass-length input'),
    generateBtn = document.querySelector('.generate-btn'),
    passwordInput = document.querySelector('.input-box input'),
    options = document.querySelectorAll('.options input'),
    passwordIndicator = document.querySelector('.pass-indicator');

const characters = { // object of letters, numbers & symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

const generatePassword = () => {
    let staticPassword = '',
        randownPassword = '',
        excludeDuplicate = false,
        passLength = lenghtSlider.value;

    [...options].map(option => {

        if (option.checked) {

            if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {

                staticPassword += characters[option.id]
            } else if (option.id === 'spaces') {

                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            };
        };
    });

    for (let i = 0; i < passLength; i++) {

        let randomChart = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if (excludeDuplicate) {

            !randownPassword.includes(randomChart) || randomChart == ' '
                ?
                randownPassword += randomChart
                :
                i--;

        } else {
            randownPassword += randomChart;
        };
    };
    passwordInput.value = randownPassword
};

const updatePasswordIndicator = () => {
    passwordIndicator.id = lenghtSlider.value <= 8
        ?
        'weak'
        :
        lenghtSlider.value <= 16
            ?
            'medium' : 'strong'
};

const updateSlider = () => {

    document.querySelector('.pass-length span').textContent = lenghtSlider.value;
    generatePassword();
    updatePasswordIndicator();
};

updateSlider();

lenghtSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);