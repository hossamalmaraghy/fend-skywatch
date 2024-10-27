import { mainFunction } from './js/app';
import './styles/style.scss';

document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById('generate');
    if (generateButton) {
        generateButton.addEventListener('click', mainFunction);
    }
});

export { mainFunction };