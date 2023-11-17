const socket = io();

socket.on('connection', socket =>{
    console.log('Nuevo usuario conectado');
});

socket.on("mensaje-servidor", (data) => {
    console.log(data)
    console.log(socket.id);
});

function funcionPrueba() {
    socket.emit("mensaje-prueba",{mensaje: "hola"})
}



function unirseSala() {
    socket.emit("unirme-sala",{mensaje:"uniendose a la sala"} )
    location.href = '/ata'
}

socket.on("verAtaque", data =>
    alert(data.mensaje)
)
socket.on("dioagua", data =>
    alert(data.mensaje)
)

function ataque(posicion){
    let posicionatacada = document.getElementById(posicion.id)
    let jugador = document.getElementById("playerId").value;
    if(jugador == "1")
      jugador = "2";
    else
      jugador = "1";
    let pego = false;
    console.log("posicion atacada:",posicion.id)
    var atacado = document.getElementById(baseBarcos.bdd[0].J2B1);
    let posAtacada = posicionatacada.id;
    posAtacada = posAtacada.replace("R", "");
    for(let i = 1; i <= 4; i++) {
      console.log(posAtacada == baseBarcos.bdd[0][`J${jugador}B${i}`].replace("P", ""), posAtacada, baseBarcos.bdd[0][`J${jugador}B${i}`].replace("P", ""))
      if(posAtacada == baseBarcos.bdd[0][`J${jugador}B${i}`].replace("P", "")) {
        console.log("PEGUE", posicionatacada, baseBarcos.bdd[0][`J${jugador}B${i}`])
        posicionatacada.classList.add("hitcasillaenemiga");
        pego = true;
        i = 5;
        socket.emit("pego") 
        return;      
      }
    }
    if (pego == false) {
        posicionatacada.classList.add("hitaguacasilla");
        socket.emit("agua")
    }
    
  }
  

//movimiento mandar a la sala y a la base de datos