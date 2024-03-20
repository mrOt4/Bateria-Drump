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

  //* escuchamos cuando preciona la tecla
  window.addEventListener("keydown", (e) => {
    //! de esto sacamos el numero de la tecla y llamamos al a funcion si existe
    const key = e.keyCode.toString();
    const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);
    if (pad) {
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
//*******CAMBIO COLOR TEMA***** */
//***************************** */

//? Volvemos a cargar el DOM
document.addEventListener("DOMContentLoaded", function () {
  //* Selecionamos los elementos de las clases marcadas y los guardamos en unas
  //* nuevas variables
  const light = document.getElementById("light-sun");
  const dark = document.getElementById("dark-moon");

  //* vemos que si hace click en el div de liht entonces
  light.addEventListener("click", function () {
    //! quita la clase priviamente añadida en el css
    document.body.classList.remove("dark-mode");
    //! añade la clase priviamente añadida en el css
    //! esto lo hacemos por si cambia muchas veces de claro a oscuro
    document.body.classList.add("light-mode");
  });

  //* vemos que si hace click en el div de dark entonces
  dark.addEventListener("click", function () {
    //! quita la clase priviamente añadida en el css
    document.body.classList.remove("light-mode");
    //! añade la clase priviamente añadida en el css
    //! esto lo hacemos por si cambia muchas veces de claro a oscuro
    document.body.classList.add("dark-mode");
  });
});

//***************************** */
//*********** GRABAR ********** */
//***************************** */

document.addEventListener("DOMContentLoaded", function () {
  // Seleccionamos los elementos relevantes del DOM
  const record = document.querySelector(".grabadora"); // Botón de grabar
  const stop = document.querySelector(".stop-grabadora"); // Botón de detener grabación
  const grabacion = document.querySelector(".grabacion"); // Mensaje de estado de la grabación
  const soundClips = document.querySelector(".soundClips"); // Contenedor de las grabaciones

  // Variables para la grabación de audio
  let mediaRecorder;
  let chunks = []; // Almacena los fragmentos de audio grabados
  let isRecording = false; // Indica si se está grabando actualmente

  // Función para reproducir el sonido asociado a una tecla
  function playSound(key) {
    // Buscamos el elemento de audio asociado a la tecla presionada
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    // Verificamos si se encontró el audio
    if (audio) {
      audio.currentTime = 0; // Reiniciamos la reproducción
      audio.play(); // Reproducimos el sonido
    }
  }

  // Agregamos un listener para detectar cuando se presionan teclas
  window.addEventListener("keydown", function (e) {
    // Verificamos si no se está grabando actualmente
    if (!isRecording) {
      const key = e.keyCode.toString(); // Obtenemos el código de la tecla presionada
      console.log("Tecla presionada:", key);
      playSound(key); // Reproducimos el sonido asociado a la tecla
    }
  });

  // Verificamos si el navegador soporta la API getUserMedia para grabación de audio
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia soportado.");
    // Solicitamos acceso al micrófono
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        // Creamos un MediaRecorder para grabar el audio del micrófono
        mediaRecorder = new MediaRecorder(stream);

        // Listener para iniciar la grabación
        record.addEventListener("click", function () {
          mediaRecorder.start(); // Iniciamos la grabación
          isRecording = true; // Indicamos que se está grabando
          console.log("Grabación iniciada");
          grabacion.textContent = "Grabando..."; // Actualizamos el mensaje de estado
          grabacion.style.color = "red"; // Cambiamos el color del mensaje
          record.disabled = true; // Desactivamos el botón de grabar
          stop.disabled = false; // Activamos el botón de detener grabación
        });

        // Listener para detener la grabación
        stop.addEventListener("click", function () {
          mediaRecorder.stop(); // Detenemos la grabación
          isRecording = false; // Indicamos que se ha detenido la grabación
          console.log("Grabación detenida");
          grabacion.textContent = "Grabación detenida"; // Actualizamos el mensaje de estado
          grabacion.style.color = "black"; // Restauramos el color del mensaje
          record.disabled = false; // Activamos el botón de grabar
          stop.disabled = true; // Desactivamos el botón de detener grabación
        });

        // Evento que se dispara cuando hay datos disponibles en la grabación
        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data); // Agregamos los datos al array de chunks
        };

        // Evento que se dispara cuando se detiene la grabación
        mediaRecorder.onstop = function () {
          const clipName = prompt("Nombre de tu grabación:"); // Solicitamos al usuario un nombre para la grabación
          const audioBlob = new Blob(chunks, { type: "audio/webm" }); // Creamos un Blob a partir de los chunks
          const audioURL = URL.createObjectURL(audioBlob); // Creamos una URL para el audio grabado

          // Creamos elementos HTML para mostrar la grabación
          const clipContainer = document.createElement("article");
          const audioElement = document.createElement("audio");
          const clipLabel = document.createElement("p");
          const deleteButton = document.createElement("button");

          // Configuramos los elementos HTML
          audioElement.controls = true; // Agregamos controles de reproducción al elemento de audio
          audioElement.src = audioURL; // Establecemos la URL del audio
          clipLabel.textContent = clipName || "Grabación sin nombre"; // Establecemos el nombre
        };
      });
  }
});
