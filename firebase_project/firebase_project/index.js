const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session');

const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
} = require("firebase/auth");



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const Listen_Port = 3000;

const server =  app.listen(Listen_Port, function () {
  console.log(
    "Servidor NodeJS corriendo en http://localhost:" + Listen_Port + "/"
  );
});

const io = require('socket.io')(server);

const sessionMiddleware = session({
    secret: 'sararasthastka',
    resave: true,
    saveUninitialized: false,
});





app.use(sessionMiddleware);

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});
app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApI_TubvxE70LUFPAqDZMQi2qzFMy5ROE",
  authDomain: "proyecto-final-g14.firebaseapp.com",
  projectId: "proyecto-final-g14",
  storageBucket: "proyecto-final-g14.appspot.com",
  messagingSenderId: "874261857872",
  appId: "1:874261857872:web:35b89f6eff1f1bd313f355"
};


const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

// Importar AuthService
const authService = require("./authService");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async function (req, res){
  //console.log (await (MySQL.realizarQuery("SELECT * FROM Users")))
  const { email, password } = {email: req.body.email, password: req.body.password};
  try {
    let userCredential = await authService.registerUser(auth, { email, password });
    console.log(email)
    //console.log(authService)
    //console.log(userCredential)
    console.log("userID", userCredential.user.uid)
    req.session.uid = userCredential.user.uid
    await MySQL.realizarQuery(`INSERT INTO Users (id_user, email, password) VALUES ("${userCredential.user.uid}", "${email}", "${password}")`)
    res.render("preparacionjuego", {
      message: "Registro exitoso. Puedes iniciar sesión ahora.",
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.render("register", {
      message: "Error en el registro: " + error.message,
    });
  } 
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/ata", (req, res) => {
  //eN SESSION VAS A GUARDAR QUIEN ES P1 Y QUIEN ES P2
  //let player = 0;
  /*if(jugadores.jugador1 === req.session.uid)
    player = 1;
  else if(jugadores.jugador2 === req.session.uid)
    player = 2;
  console.log("JUGADORES ", jugadores, "UID ", req.session.uid)*/


  //darle el valor
  res.render("ataquejuego" , { players: req.session.players });
});

app.get("/prep", (req, res) =>{
  let players = 0;
  id = req.session.uid;
  if(jugadores1.jugadore1 == id){
    req.session.players = 1;
    req.session.save()
  }else if(jugadores1.jugadore2 == id)
    req.session.players = 2;
    req.session.save()
  console.log("JUGADORES ", jugadores1, "UID ", req.session.uid)
  res.render("preparacionjuego", { players: req.session.players });

})

app.get("/prep", (req, res) => {
  res.render("preparacionjuego");
});

app.get("/preparacionjuego", (req, res) =>{
  res.render("ataquejuego")
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/ata", (req, res) =>{
  res.render("ataquejuego")
});

let cant1 = 0

var jugadores1 = {
  jugadore1: 0,
  jugadore2: 0
};

app.post("/login", async (req, res) => {
  const { email, password } = {email: req.body.email, password: req.body.password};

  try {
    
    let userCredential = await authService.loginUser(auth, { email, password });
    req.session.mail = email
    console.log("userID", userCredential.user.uid)
    req.session.uid = userCredential.user.uid
    req.session.save()
    if (email=="SoyAdmin@admin.com" && password=="SoyAdmin"){
      res.render("admin", {
        message: "Se redirige a admin",
      });
    } else {
      res.redirect("/prep")
      if (cant1==0){
        console.log("Jugador 1")
        jugadores1.jugadore1 = req.session.uid
        cant1 = 1
      }
      else {
        console.log("Jugador 2")
        jugadores1.jugadore2 = req.session.uid
        cant1 = 2
      }
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.render("login", {
      message: "Error en el inicio de sesión: " + error.message,
    });
  }
});

app.post('/admin', async function(req, res) {
  await MySQL.realizarQuery(`DELETE FROM Users WHERE email = "${req.body.deleteusuario}"`)
  let respuesta = await MySQL.realizarQuery(`SELECT * FROM Users WHERE email = "${req.body.deleteusuario}"`);

    //Chequeo el largo del vector a ver si tiene datos
    if (respuesta.length == 0) {
        //Armo un objeto para responder
        res.send({validar: true})
    }
    else{
        res.send({validar:false})    
    
    }
});
app.get("/dashboard", (req, res) => {
  // Agrega aquí la lógica para mostrar la página del dashboard
  res.render("dashboard");
});

/************************************** */

var jugadores = {
  jugador1: 0,
  jugador2: 0
};




app.post("/prep", async (req, res) => {
  console.log("POST /prep:" ,req.body)
  if (req.session.uid == jugadores1.jugadore1) {
    MySQL.realizarQuery (`UPDATE Partidas SET J1B${req.body.barco} = "${req.body.casilla}" WHERE NOT ID_Partida = "null";`)
  }
  else if(req.session.uid == jugadores1.jugadore2){
    MySQL.realizarQuery (`UPDATE Partidas SET J2B${req.body.barco} = "${req.body.casilla}" WHERE NOT ID_Partida = "null";`)
  }



  res.send({validar: true})


})




app.get('/fin', function (req, res) 
{
  res.render("fin");
})



app.get('/admin', function(req, res)
{
    console.log("Soy un pedido GET", req.query); 
    res.render('delete', null);
});



let cant = 0

app.put('/admin', function(req, res)
{
    console.log("Soy un pedido GET", req.query); 
    res.render('delete', null);
});

// server-side
io.on("connection", (socket) => {
  const req = socket.request;
  req.session.save();
  console.log(socket.id); 
  socket.on("mensaje-prueba", (data) => {
    console.log(data);
    socket.emit("mensaje-servidor", {mensaje: "chau"})
  });

  
  socket.on("unirme-sala", (data) =>{
    console.log("Pase por aca")
    if (req.session.players == 1){
      console.log("Jugador 1")
      cant = 1
    }
    else if (req.session.players == 2){
      console.log("Jugador 2")
      cant = 2
    }
    
    if (cant <2) {
      console.log("CANT < 2", data)
    socket.join("nombreSala")
    io.to("nombreSala").emit("some event");

    }else
    {//salallena)
    }
  })

  // socket.on("nombreSala",()  => {
    
  // })
  
  socket.on("pego", (data) =>{
    io.emit("verAtaque", {lugar: data.lugar, jugador: data.jugador, mensaje: "Fuego"})
  });
   
  
  socket.on("agua", (data) =>{
    io.emit("dioagua",{lugar: data.lugar, jugador: data.jugador, mensaje: "Agua"})
  });
   

  
  socket.on("fin", (data) =>{
    io.emit("final", {mensaje: "Fin del juego"})
  });
});    
 
app.get('/traerbarco', async function(req, res){
    let posi = await MySQL.realizarQuery(`SELECT * FROM Partidas WHERE NOT ID_Partida = "null";`) 
    console.log("Soy un pedido GET", req.query); 
    res.send({bdd: posi});
});