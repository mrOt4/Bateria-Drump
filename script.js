//******************************** */
//*********Escuchadores*********** */
//******************************** */

//? Aqui lanzamos le DOM lo primero de todo, para que cargue y analice
document.addEventListener("DOMContentLoaded", function () {
  //* Selecionamos los elementos de las clases marcadas y los guardamos en unas
  //* nuevas variables
  const drumPads = document.querySelectorAll(".drum-pad"); //!botones de la bateria
  const audios = document.querySelectorAll("audio"); //!sonidos de la batería
  const volumen = document.getElementById("volumen"); //!control sonidos de la batería

  //? escuchamos si se desliza y le aplicamos cambios...
  volumen.addEventListener("input", function () {
    //*primero lo recorremos
    audios.forEach((audio) => {
      //!de esto obtenemos un numero y lo convertimos a decimal
      const valorVolumen = parseFloat(this.value) / 100;
      //! y el numero anterior lo agregamos a valor del audio
      audio.volume = valorVolumen;
    });
  });

  //*recorremos los botones y cuando vemos que hace click llamamos a la funcion
  drumPads.forEach((pad) => {
    pad.addEventListener("click", () => {
      playSound(pad);
    });
  });

  // Escuchamos cuando presiona la tecla
window.addEventListener("keydown", (e) => {
  // Obtenemos el número de la tecla y llamamos a la función si existe
  const key = e.keyCode.toString();
  const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);
  if (pad) {
      pad.classList.add('pressed'); // Agregamos la clase pressed
      setTimeout(() => {
          pad.classList.remove('pressed'); // Eliminamos la clase pressed después de 100 milisegundos
      }, 300);
      playSound(pad);
  }
});

  //*tomamos como valor el 'data-key' y buscamos el elemento audio correspondiente
  function playSound(pad) {
    const key = pad.getAttribute("data-key");
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!audio) return;
    audio.currentTime = 0; //! rebobina al principio
    audio.play(); //!reproduce el que encontró
  }
});

//***************************** */
//*********** GRABAR ********** */
//***************************** */

document.addEventListener("DOMContentLoaded", function () {
  // Resto del código...

  // Variables para la grabación de la secuencia
  let secuenciaGrabada = []; // Almacena las teclas pulsadas durante la grabación
  let grabandoSecuencia = false; // Indica si se está grabando una secuencia

  // Listener para grabar la secuencia
  const grabarSecuenciaBtn = document.querySelector(".grabar-secuencia");
  grabarSecuenciaBtn.addEventListener("click", function () {
    secuenciaGrabada = []; // Reiniciamos la secuencia grabada
    grabandoSecuencia = true; // Indicamos que se está grabando la secuencia
    console.log("Grabando secuencia...");
  });

  // Listener para reproducir la secuencia
  const reproducirSecuenciaBtn = document.querySelector(".reproducir-secuencia");
  reproducirSecuenciaBtn.addEventListener("click", function () {
    reproducirSecuencia();
  });

  // Función para reproducir la secuencia grabada
  function reproducirSecuencia() {
    if (secuenciaGrabada.length === 0) {
      console.log("No hay secuencia grabada para reproducir.");
      return;
    }
    console.log("Reproduciendo secuencia...");
    secuenciaGrabada.forEach((key, index) => {
      setTimeout(() => {
        playSound(key);
      }, index * 500); // Reproduce cada sonido con un intervalo de 500ms
    });
  }

  // Resto del código...

  // Modificamos la función playSound para que registre las teclas pulsadas durante la grabación
  function playSound(pad) {
    const key = pad.getAttribute("data-key");
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    if (grabandoSecuencia) {
      secuenciaGrabada.push(key); // Registra la tecla pulsada durante la grabación
    }
  }
});


//***************************** */
//******* SWITCH DARKMODE ***** */
//***************************** */


document.addEventListener('DOMContentLoaded', () => {

  const switchInput = document.getElementById('switch');
  const switchInner = document.getElementById('switch-inner')
  const switchLabel = document.getElementById('switch-label')

  switchInput.addEventListener('change', () => { 
      document.body.classList.toggle('dark-mode');
      switchInner.classList.toggle('active')
      switchLabel.classList.toggle('active')     
  });
});

