const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const MySQL = require('./modulos/mysql');
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

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const Listen_Port = 3000;

app.listen(Listen_Port, function () {
  console.log(
    "Servidor NodeJS corriendo en http://localhost:" + Listen_Port + "/"
  );
});

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
  console.log (await (MySQL.realizarQuery("SELECT * FROM Users")))
  const { email, password } = {email: req.body.email, password: req.body.password};
  try {
    let userCredential = await authService.registerUser(auth, { email, password });
    console.log(authService)
    console.log(userCredential)
    console.log(userCredential.user.uid)
    await MySQL.realizarQuery(`INSERT INTO Users (id_user, email, password, admin) VALUES (${userCredential.user.uid}, "${email}", "${password}", 0))`)
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
  res.render("ataquejuego");
});

app.get("/prep", (req, res) => {
  res.render("preparacionjuego");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    let userCredential = await authService.loginUser(auth, { email, password });
    if (authService.loginUser.email=="SoyAdmin@admin.com" && authService.loginUser.password=="SoyAdmin"){
      res.render("admin", {
        message: "Se redirige a admin",
      });
    } else {
      res.render("preparacionjuego", {
        message: "Inicio de sesion exitoso",
      });
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.render("login", {
      message: "Error en el inicio de sesión: " + error.message,
    });
  }
});

app.get("/dashboard", (req, res) => {
  // Agrega aquí la lógica para mostrar la página del dashboard
  res.render("dashboard");
});

/************************************** */



