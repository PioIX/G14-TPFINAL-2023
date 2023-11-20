async function putJSON5(data) {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

  try {
    const response = await fetch("/admin", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);

    if (result.validar == false) {
      alert("Los datos son incorrectos")
    } else {
      //Envio el formularia desde dom para cambiar de pagina
      //Podria usar tambien un changeScreen()
      document.getElementById("form3").submit()
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

function borrar() {
  //Leo los datos del input
  let id_User = document.getElementById("deleteusuario").value
  //Creo un objeto de forma instantanea
  let data = {
    deleteusuario: id_User
  }

  //data es el objeto que le paso al back
  putJSON5(data)

}


let imagenSeleccionada = -1

let objeto = {
  barco: -1,
  casilla: -1,
  largo: -1
}

function casilla(posicion) {
  console.log(posicion)
  posicion.classList.add("mystyle");
  console.log(posicion.id)
  let ubicacion = document.getElementById(posicion.id).getBoundingClientRect()
  console.log(ubicacion.top)
  /*
  position: absolute;
  top: 20%;
  right: 30%; */
  if (imagenSeleccionada != -1) {
    let mover = document.getElementById(imagenSeleccionada)
    mover.style.position = "absolute"
    mover.style.top = (ubicacion.top + 3)+ "px"
    mover.style.left = (ubicacion.left - 60)+ "px"
    /*let data = {top: ubicacion.top, left: ubicacion.left, imagenSeleccionada: imagenSeleccionada}
    console.log(data)*/
    let objeto = {barco: imagenSeleccionada ,casilla: posicion.id, orientación: 0 }
    guardarBarco(objeto)
    
  }
}



/*function casilla1(posicion) {
  // Obtener el ID del elemento clickeado en la tabla tablaprep
  var id = posicion.id.getElementById(tablaprep) ;

  // Seleccionar el elemento correspondiente en la tabla tablata
  var elementoTablata = document.getElementById(id.replace("P", "R"));

  // Cambiar el color de fondo del elemento seleccionado en tablata
  elementoTablata.classList.add("barcoubicadopropio");
}
*/


async function importa() {   

  try {
    const responseG = await fetch("/traerbarco", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });

    let id = document.getElementById("playerId").value;
    const resultG = await responseG.json();
    baseBarcos = resultG;
    console.log("Success:", resultG);
    //Pintar la casilla contenida dentro de J1B1
    if (id == 1) {
      var elementoTablata = document.getElementById(resultG.bdd[0].J1B1);
      elementoTablata.classList.add("barcoubicadopropio");
      var elementoTablata = document.getElementById(resultG.bdd[0].J1B2);
      elementoTablata.classList.add("barcoubicadopropio");
      var elementoTablata = document.getElementById(resultG.bdd[0].J1B3);
      elementoTablata.classList.add("barcoubicadopropio");
      var elementoTablata = document.getElementById(resultG.bdd[0].J1B4);
      elementoTablata.classList.add("barcoubicadopropio");
    } else if (id == 2) {
      var elementoTablata = document.getElementById(resultG.bdd[0].J2B1);
      elementoTablata.classList.add("barcoubicadopropio");
      var elementoTablata = document.getElementById(resultG.bdd[0].J2B2);
      elementoTablata.classList.add("barcoubicadopropio");
      var elementoTablata = document.getElementById(resultG.bdd[0].J2B3);
      elementoTablata.classList.add("barcoubicadopropio");
      var elementoTablata = document.getElementById(resultG.bdd[0].J2B4);
      elementoTablata.classList.add("barcoubicadopropio");
    }

  } catch (error) {
    console.error("Error:", error);
  }

}

async function guardarBarco(data) {   

  try {
    console.log(data)
    const responseG = await fetch("/prep", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    
    const resultG = await responseG.json();
    console.log("Success:", resultG);

    if (resultG.validar == false) {
      alert("Los datos son incorrectos")  
    }
  

  } catch (error) {
    console.error("Error:", error);
  }

}


function imagen(posicion) {
console.log(posicion)
imagenSeleccionada = posicion.id
console.log(imagenSeleccionada)

}

let posicionatacada = -1





