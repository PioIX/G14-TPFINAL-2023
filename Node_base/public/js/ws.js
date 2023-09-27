const IP = "ws://localhost:3000";
const socket = io(IP)

socket.on("connect", () =>{
    console.log("Me conecte a WS");
});

socket.on("server-message", data =>{
    console.log("Me llego del servidor")
})

function funcionPrueba(){
    socket.emit("incoming-message", {mensaje: "PRUEBA"});
}