function changeScreenadmin() {
    const admin = document.getElementById("admin");
    const login = document.getElementById("login");
    if(admin.style.display !== "none") {
        admin.style.display = "none";
        login.style.display = "";
    }
    else {
        admin.style.display = "";
        login.style.display = "none";
    }
}



async function putJSON(data) {
    //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

    try {
      const response = await fetch("/login", {
        method: "PUT", // or 'POST'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);

      if (result.validar == -1) {
        changeScreenadmin()
      } else if (result.validar == 1) {
        //Envio el formularia desde dom para cambiar de pagina
        //Podria usar tambien un changeScreen()
        document.getElementById("form1").submit()
      } else {
        alert("Los datos son incorrectos")
      }

    } catch (error) {
      console.error("Error:", error);
    }
  }

  //Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
  function login() {
    //Leo los datos del input
    let usuario = document.getElementById("usuarioId").value
    let contraseña = document.getElementById("passwordId").value

    //Creo un objeto de forma instantanea
    let data = {
        user: usuario,
        pass: contraseña
    }

    //data es el objeto que le paso al back
    putJSON(data)

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
    guardarMovimiento(data)
    
  }
}

async function guardarMovimiento(data) {   

  try {
    console.log(data)
    const response = await fetch("/guardarMovimiento", {
      method: "post", // or 'POST'
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
}

let posicionatacada = -1

function ataque(posicion){
  console.log(posicion)
  console.log(posicion.id)
  let ubicacionataque = document.getElementById(posicion.id).getBoundingClientRect()
  console.log(ubicacionataque.top)
  
} 


