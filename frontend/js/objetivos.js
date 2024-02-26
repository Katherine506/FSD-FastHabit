const inputTipo = document.getElementById("slt-tipo");
const inputCantidad = document.getElementById("txt-cantidad");
const inputDesscripcion = document.getElementById("txt-descripcion");
const btnAgregar = document.getElementById("btn-agregar");

const registrarObjetivo = () => {
  let objetivo = {
    tipo: inputTipo.value,
    cantidad: inputCantidad.value,
    descripcion: inputDesscripcion.value,
  };
  registrarDatos("registrar-objetivo", objetivo);
};
const validar = () => {
  let error = false;
  let camposRequeriddos = document.querySelectorAll(".requerido");

  camposRequeriddos.forEach((campo) => {
    if (campo.value == "") {
      error = true;
      campo.classList.add("input-error");
    } else {
      campo.classList.remove("input-error");
    }
  });
  if (error) {
    Swal.fire({
      title: "Registro incorrecto",
      text: "Por favor complete los campos resaltados",
      icon: "warning",
    });
  } else {
    registrarObjetivo();
  }
};

const obtenerObjetivos = async () => {
  let listaObjetivos = await obtenerDatos("listar-objetivos");
  let tbody = document.querySelector("#tbl-objetivos tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < listaObjetivos.length; i++) {
    let fila = tbody.insertRow();
    fila.insertCell().innerHTML = listaObjetivos[i]["tipo"];
  }
};
const obtenerDescripcion = async () => {
  let listaObjetivos = await obtenerDatos("listar-objetivos");
  let tbody = document.querySelector("#tbl-descripcion-body");
  tbody.innerHTML = "";
  for (let i = 0; i < listaObjetivos.length; i++) {
    let fila = tbody.insertRow();
    fila.insertCell().innerHTML = listaObjetivos[i]["descripcion"];
  }
};
const reloadTable = () => {
  obtenerObjetivos();
  obtenerDescripcion();
};

const extraerPesos = async () => {
  let listaPesos = await obtenerDatos("obtener-pesos");
  let pesoActual = listaPesos[listaPesos.length - 1].peso;
  let pesoObjetivo = listaPesos[0].peso;

  const resultadoPeso = pesoObjetivo - pesoActual;

  if (resultadoPeso > 0) {
    document.getElementById("aumento-peso").classList.add("completado");
  } else if (resultadoPeso < 0) {
    document.getElementById("baja-peso").classList.add("completado");
  } else if (resultadoPeso == 0) {
    document.getElementById("mantiene-peso").classList.add("completado");
  }
};

btnAgregar.addEventListener("click", validar);
reloadTable();
extraerPesos();
