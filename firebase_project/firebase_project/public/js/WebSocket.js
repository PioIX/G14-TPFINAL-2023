const socket = io();

socket.on('connection', socket =>{
    console.log('Nuevo usuario conectado');
});

socket.on("mensaje-serhttps://github.com/PioIX/G14-TPFINAL-2023/pull/32/conflict?name=firebase_project%252Ffirebase_project%252Fpublic%252Fjs%252FWebSocket.js&ancestor_oid=ee6c2a5615b00d656196f02bfe5044f7a3c647d8&base_oid=179fbccd3b47fcb1f3c453dc7890b6854bad8def&head_oid=626bcdd0cc221472ad08dd445c068caf70611ab6vidor", (data) => {
    console.log(data)
    console.log(socket.id);
});



function funcionPrueba() {
    socket.emit("mensaje-prueba",{mensaje: "hola"})
}

// function unirseprep() {
//   socket.emit("unirme-prep",{mensaje:"Jugando devuelta"} )
//   location.href = '/prep'
// }

function reslogin(){
  location.href= '/login'
}

function unirseSala() {
    socket.emit('unirme-sala',{mensaje:"uniendose a la sala"} )
    location.href = '/ata'
}

socket.on("verAtaque", data =>{
  alert(data.mensaje);
  let turno = document.getElementById("turnos").innerHTML;
    if (turno == 1){
      document.getElementById("turnos").innerHTML = "2"
    } else if (turno == 2){
      document.getElementById("turnos").innerHTML = "1"
    }
  console.log(turno)
});
socket.on("dioagua", data =>{
  alert(data.mensaje)
  let turno = document.getElementById("turnos").innerHTML;
    if (turno == 1){
      document.getElementById("turnos").innerHTML = "2"
    } else if (turno == 2){
      document.getElementById("turnos").innerHTML = "1"
    }
  console.log(turno)
});

socket.on("final", data =>{
  console.log("termino")
  finJuego()
})

var baseBarcos = {};
var barcosAtacados = [];
function ataque(posicion){
    let posicionatacada = document.getElementById(posicion.id)
    let jugador = document.getElementById("playerId").value;
    let turno = document.getElementById("turnos").innerHTML;
    let pego = false
    if (jugador==turno){
    
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
          console.log("El usuario:", data.jugador, "dió fuego en:", data.lugar)
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
    else
    {console.log(" No es tu turno",turno,jugador)
    }
    
}



//movimiento mandar a la sala y a la base de datos
function render(data){
  if (data.jugador == 1){
    document.getElementById("turnos").innerHTML = "2"
  } else if (data.jugador == 2){
    document.getElementById("turnos").innerHTML = "1"
  }

}
  
 

