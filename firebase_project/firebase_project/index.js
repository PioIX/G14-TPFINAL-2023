const express = require("express");
const exphbs = require("express-handlebars");
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
  apiKey: "AIzaSyA936j4rOJbIGAiPMENWJAMbIAeCULI8J8",
  authDomain: "infothebest-3b261.firebaseapp.com",
  projectId: "infothebest-3b261",
  storageBucket: "infothebest-3b261.appspot.com",
  messagingSenderId: "125429100089",
  appId: "1:125429100089:web:707f20f776e39a3d8367e8",
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

app.post("/register", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    await authService.registerUser(auth, { usuario, password });
    res.render("register", {
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

app.get("/juego", (req, res) => {
  res.render("juego");
});

app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const userCredential = await authService.loginUser(auth, {
      usuario,
      password,
    });
    // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión exitoso
    res.redirect("/dashboard");
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


