
const lenghtSlider = document.querySelector('.pass-length input');

const updateSlider = () => {
    document.querySelector('.pass-length span').textContent = lenghtSlider.value;
};

updateSlider();

lenghtSlider.addEventListener('input', updateSlider);