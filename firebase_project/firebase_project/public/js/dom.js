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
    let data = {top: ubicacion.top, left: ubicacion.left, imagenSeleccionada: imagenSeleccionada}
    console.log(data)
    guardarBarco(data)
    
  }
}


async function guardarBarco(data) {   

  try {
    console.log(data)
    const response = await fetch("/guardarBarco", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
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

/*
function ataque(posicion){
  
  console.log("posicion atacada:",posicion.id)
  let posicionatacada = posicion.id  
  if (result.posiciones = posicionatacada){
    console.log("tocado")

  }
  else{
    console.log("agua")

  }
  
  console.log(ubicacionataque.top)
} 
/*

async function ataque(posicionatacada) {   

  try {
    const response = await fetch("/ataque", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posicionatacada),
    });
    
    
  } catch (error) {
    console.error("Error:", error);
  }
}
*/

async function ataque(posicionatacada) {   

  try {
    const response = await fetch("/ataque", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posicionatacada),
    });
    
    
  } catch (error) {
    console.error("Error:", error);
  }
}

function ataque() {
  //Leo los datos del input
  let id_User = document.getElementById("deleteusuario").value
  //Creo un objeto de forma instantanea
  let data = {
    deleteusuario: id_User
  }

  //data es el objeto que le paso al back
  putJSON5(data)

}
