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

function unirseprep() {
  socket.emit("unirme-prep",{mensaje:"Jugando devuelta"} )
  location.href = '/prep'
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

socket.on("final", data =>{
  console.log("termino")
  finJuego()
})

var baseBarcos = {};
var barcosAtacados = [];
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
        // console.log("PEGUE", posicionatacada, baseBarcos.bdd[0][`J${jugador}B${i}`])
        posicionatacada.classList.add("hitcasillaenemiga");
        pego = true;
        i = 5;

        socket.emit("pego", {lugar: posicion.id, jugador: playerId.value})
          socket.on('verAtaque', data =>{
            console.log("El usuario:", data.jugador, "pego en:", data.lugar)
            render(data)
          }) 
        barcosAtacados.push(posAtacada)
        console.log(barcosAtacados)
        if (barcosAtacados.length == 4) {
          socket.emit("fin")
          finJuego();
        }
        

        return;      
        
      }
    }
    if (pego == false) {
        posicionatacada.classList.add("hitaguacasilla");
        socket.emit("agua", {lugar: posicion.id, jugador: playerId.value})
        socket.on('dioagua', data =>{
          console.log("El usuario:", data.jugador, "dió agua en:", data.lugar)
            render(data)
        }) 
    }
    
    
}



//movimiento mandar a la sala y a la base de datos
function render(data){
  if (data.jugador == 1){
    document.getElementById("turnos").innerHTML = "Es turno del jugador 2"
  } else if (data.jugador == 2){
    document.getElementById("turnos").innerHTML = "Es turno del jugador 1"
  }

}
  
 

