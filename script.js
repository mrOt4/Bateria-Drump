"use strict";


const botonModoColor = document.querySelector("#darkModeButton");
const body = document.body;

colorModeButton.addEventListener("click", cambiarModoColor);

function cambiarModoColor() {
    body.classList.toggle("darkMode");

    if (body.classList.contains("darkMode")) {
        colorModeButton.innerText = "Modo diurno";
    } else {
        colorModeButton.innerText ="Modo oscuro";
    }
}



