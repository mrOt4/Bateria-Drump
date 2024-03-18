"use strict";

const drumPads = document.querySelectorAll('.drum-pad');
        const audios = document.querySelectorAll('audio');

        drumPads.forEach(pad => {
            pad.addEventListener('click', () => {
                playSound(pad);
            });
        });

        window.addEventListener('keydown', (e) => {
            const key = e.keyCode.toString();
            const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);
            if (pad) {
                playSound(pad);
            }
        });

        function playSound(pad) {
            const key = pad.getAttribute('data-key');
            const audio = document.querySelector(`audio[data-key="${key}"]`);
            if (!audio) return;
            audio.currentTime = 0; // Rewind to the start
            audio.play();
        }






        document.addEventListener("DOMContentLoaded", function(){
            const light = document.querySelector(".light-sun");
            const dark = document.querySelector(".dark-moon");


            light.addEventListener("click", function(){
                document.body.classList.remove("darkMode");
                document.body.classList.add("lightMode");
            })


            dark.addEventListener("click", function(){
                document.body.classList.remove("lightMode");
                document.body.classList.add("darkMode");
            })
        })


    /*
        const botonModoColor = document.addEventListener(".botones");
        const body = document.body;
        
        colorModeButton.addEventListener("click", cambiarModoColor);
        
        function cambiarModoColor() {
            body.classList.toggle("botones");
        
         if (body.classList.contains("darkMode")) {
                colorModeButton.innerText = "Modo diurno";
            } else {
                colorModeButton.innerText ="Modo oscuro";
            }
        }
        */