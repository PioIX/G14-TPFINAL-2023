const {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} = require("firebase/auth");

// Función para registrar un usuario
const registerUser = async (auth, { email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(auth.currentUser);
    console.log("Verification email sent!");
    return userCredential
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const loginUser = async (auth, { email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(auth.currentUser);
    console.log("Verification email sent!");
    return userCredential
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};
