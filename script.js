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
