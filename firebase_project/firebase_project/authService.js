const {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} = require("firebase/auth");

// Función para registrar un usuario
const registerUser = async (auth, { usuario, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      usuario,
      password
    );
    await sendEmailVerification(auth.currentUser);
    console.log("Verification email sent!");
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const loginUser = async (auth, { usuario, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      usuario,
      password
    );

    if (!userCredential.user.emailVerified) {
      throw new Error(
        "Por favor, verifica tu correo electrónico para iniciar sesión."
      );
    }

    console.log("Inicio de sesión exitoso para el usuario:", usuario);
    return userCredential;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};
