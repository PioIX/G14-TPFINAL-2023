function casilla(posicion) {
    console.log(posicion)
}

function changeScreenadmin() {
    const admin = document.getElementById("admin");
    const login = document.getElementById("login");
    if(admin.style.display !== "none") {
        admin.style.display = "none";
        login.style.display = "";
    }
    else {
        admin.style.display = "";
        login.style.display = "none";
    }
}
