import main from "../src/routes/main.js";
import { apiUri, rolUri, permisoUri, usuarioUri, rolPermisoUri } from "./js/api-ref.js";  

//Primer paso en cargarse
window.addEventListener("load", () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "../";
  }
  verificarToken();
  main();
});

//Salir de la app
document.querySelector("#logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    window.location.href = "../";
  });

const decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");

  return JSON.parse(window.atob(base64));
};
const verificarToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../";
  } else if (token) {
    //token expires
    const decoded = decodeToken(token);
    const exp = decoded.exp;
    if (!localStorage.getItem("usuario")) {
      localStorage.setItem("usuario", decoded.usuario);
    }
    const now = new Date().getTime() / 1000;
    if (exp < now) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("rol");
      window.location.href = "../";
    }
  }
};



