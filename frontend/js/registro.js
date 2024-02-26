const txtNombre = document.getElementById("txt-nombre");
const txtEmail = document.getElementById("txt-email");
const txtAltura = document.getElementById("txt-altura");
const txtPeso = document.getElementById("txt-peso");
const txtActividad = document.getElementById("txt-actividad");
const txtGenero = document.getElementById("txt-genero");
const txtNacimiento = document.getElementById("txt-nacimiento");
const txtPesoIdeal = document.getElementById("txt-peso-ideal");
const txtEnfermedad = document.getElementById("txt-enfermedad");
const btnRegistrar = document.getElementById("btn-calcular");
const btnEnfermedades = document.getElementById("btn-enfermedades");
const txtEnfermedadNombre = document.getElementById("txt-nombre-enfermedad");
const txtEnfermedadDescripcion = document.getElementById("txt-descripcion");
const txtEnfermedadTratamiento = document.getElementById("txt-tratamiento");
const txtEnfermedadEstado = document.getElementById("txt-estado");
const inputFoto = document.querySelector("#foto");

const validarEnfermedad = () => {
  opcionEnfermedad = txtEnfermedad.value;

  if (opcionEnfermedad == "") {
    error = true;

    txtEnfermedad.classList.add("input-error");
  } else {
    txtEnfermedad.classList.remove("input-error");

    if (opcionEnfermedad == 1) {
      document.querySelector(".formulario3").style.display = "block";
      if (opcionEnfermedad == 1) {
        validarEnfermedadDetalles1();
      }
    } else {
      registrarUsuario();
    }
  }
};

const registrarUsuario = () => {
  let registro = {
    nombre: txtNombre.value,
    email: txtEmail.value,
    altura: txtAltura.value,
    peso: txtPeso.value,
    actividad: txtActividad.value,
    genero: txtGenero.value,
    nacimiento: txtNacimiento.value,
    pesoIdeal: txtPesoIdeal.value,
    enfermedad: txtEnfermedad.value,
    nombreEnfermedad: txtEnfermedadNombre.value,
    descripcion: txtEnfermedadDescripcion.value,
    tratamiento: txtEnfermedadTratamiento.value,
    estado: txtEnfermedadEstado.value,
    foto: inputFoto.src,
  };
  console.log(registro);
  registrarDatos('registrar-usuario', registro, 'perfil.html');
};

const validar = () => {
  let error = false;
  let camposRequeridos = document.querySelectorAll(".requerido");

  camposRequeridos.forEach((campo) => {
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
    validarEnfermedad();
  }
};

const validarEnfermedad1 = () => {
  let error = false;
  let camposRequeridos = document.querySelectorAll(".requerido3");

  camposRequeridos.forEach((campo) => {
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
    registrarUsuario();
  }
};

btnRegistrar.addEventListener("click", validar);
btnRegistrar.addEventListener("click", validarEnfermedad);
btnEnfermedades.addEventListener("click", validarEnfermedad1);
