const apiUri = "https://einzas-api.herokuapp.com/api/v1";

window.addEventListener("load", function () {
  if (localStorage.getItem("token")) {
    window.location.href = "./app";
  }
});
document.querySelector("#formulario").addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario_login = document.querySelector("#usuario_login").value;
  const usuario_clave = document.querySelector("#usuario_clave").value;
  const data = { usuario_login, usuario_clave };
  login(data);
});

const login = async (data) => {
  const res = await fetch(`${apiUri}/ad_login/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (json.error) {
    return Swal.fire("Error", json.error, "error");
  }
  if (json.message == "Login correcto") {
    if (json.estado == 1) {
      localStorage.setItem("token", json.token);
      localStorage.setItem("timer", "0");
      localStorage.setItem("rol", json.rol);
      Swal.fire({
        title: "Bienvenido",
        text: "Iniciando sesión...",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.href = "./app";
        }
      });
    } else {
      Swal.fire(
        "Error",
        "Usuario desactivado, por favor contacte con el administrador.",
        "error"
      );
    }
  } else if (json.message == "Usuario no encontrado") {
    Swal.fire("Error", "Usuario y/o contraseña invalidos", "error");
  } else if (json.message == "Contraseña incorrecta") {
    Swal.fire("Error", "Usuario y/o contraseña invalidos", "error");
  }
};


