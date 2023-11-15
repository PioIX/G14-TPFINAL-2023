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




//movimiento mandar a la sala y a la base de datos