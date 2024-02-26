let registros;
const cargarPerfil = async () => {
  registros.forEach(async (registro) => {
    document.querySelector("#txt-nombre").innerHTML = registro.nombre;
    document.querySelector("#txt-nacimiento").innerHTML = registro.nacimiento;
    document.querySelector("#txt-email").innerHTML = registro.email;
    document.querySelector("#txt-altura").innerHTML = registro.altura;
    document.querySelector("#txt-inicio").innerHTML = registro.peso;
    document.querySelector("#txt-actividad").innerHTML = await actividadFisica(
      registro.actividad
    );
    document.querySelector("#txt-peso-ideal").innerHTML = registro.pesoIdeal;
    document.querySelector("#txt-enfermedad").innerHTML =
      await definirEnfermedad(registro.enfermedad);
    document.querySelector("#txt-nombre-enfermedad").innerHTML =
      registro.nombreEnfermedad;
    document.querySelector("#txt-descripcion").innerHTML = registro.descripcion;
    document.querySelector("#txt-tratamiento").innerHTML = registro.tratamiento;
    document.querySelector("#txt-estado").innerHTML = await enfermedadActiva(
      registro.estado
    );
    document.querySelector("#txt-genero").innerHTML = await elegirGenero(
      registro.genero
    );
    document.querySelector("#foto").innerHTML = registro.foto;
  });
};

const calcularIMCInicio = async () => {
  registros.forEach(async (registro) => {
    registro.altura = registro.altura * 0.01;
    registro.peso;
    let imc = registro.peso / (registro.altura * registro.altura);
    imc = imc.toFixed(2);
    document.getElementById("txt-imc-inicial").innerHTML = imc;
  });
};

const cargarPeso = async () => {
  listaPesos.forEach((pesos) => {
    document.querySelector("#txt-peso").innerHTML = pesos.peso;
  });
};

const actividadFisica = async (actividad) => {
  let realizaActividad = "";
  if (actividad == 1) {
    realizaActividad = "Sí";
  } else {
    realizaActividad = "No";
  }
  return realizaActividad;
};

const elegirGenero = async (genero) => {
  let tipoGenero = "";
  if (genero == 1) {
    tipoGenero = "Femenino";
  } else {
    tipoGenero = "Masculino";
  }
  return tipoGenero;
};

const definirEnfermedad = async (enfermedad) => {
  let tieneEnfermedad = "";
  if (enfermedad == 1) {
    tieneEnfermedad = "Sí";
  } else {
    tieneEnfermedad = "No";
  }
  return tieneEnfermedad;
};

const calcularIMC = async () => {
  registros.forEach((registros) => {
    altura = registros.altura;
  });
  listaPesos.forEach((pesos) => {
    let imcActual = pesos.peso / (altura * altura);
    console.log(imcActual);
    imcActual = imcActual.toFixed(2);
    document.getElementById("txt-imc").innerHTML = imcActual;
    console.log(altura);
    console.log(pesos.peso);
  });
};

const calcularProteina = async () => {
  registros.forEach(async (registro) => {
    registro.actividad;
    registro.genero;
    registro.peso;
    if (registro.actividad == 1 && registro.genero == 2) {
      let proteinaMinima = registro.peso * 1.7;
      let proteinaMaxima = registro.peso * 2.5;
      proteinaMinima = proteinaMinima.toFixed(2);
      proteinaMaxima = proteinaMaxima.toFixed(2);
      document.getElementById("txt-proteina-min").innerHTML = proteinaMinima;
      document.getElementById("txt-proteina-max").innerHTML = proteinaMaxima;
    } else if (registro.actividad == 1 && registro.genero == 1) {
      let proteinaMinima = registro.peso * 1.6;
      let proteinaMaxima = registro.peso * 1.8;
      proteinaMinima = proteinaMinima.toFixed(2);
      proteinaMaxima = proteinaMaxima.toFixed(2);
      document.getElementById("txt-proteina-min").innerHTML = proteinaMinima;
      document.getElementById("txt-proteina-max").innerHTML = proteinaMaxima;
    } else {
      let proteinaMinima = registro.peso * 0.8;
      document.getElementById("txt-proteina-min").innerHTML = proteinaMinima;
      proteinaMinima = proteinaMinima.toFixed(2);
    }
  });
};

const calcularAgua = async () => {
  registros.forEach(async (registro) => {
    registro.peso;
    let agua = registro.peso / 7;
    agua = agua.toFixed(2);
    document.getElementById("txt-agua").innerHTML = agua;
  });
};

const enfermedadActiva = async (estado) => {
  let estadoEnfermedad = "";
  if (estado == 1) {
    estadoEnfermedad = "Enfermedad activa";
  } else if (estado == 2) {
    estadoEnfermedad = "Enfermedad inactiva";
  }
  return estadoEnfermedad;
};

const calcularEdad = async () => {
  let fechaNacimiento = new Date(registros[0].nacimiento);
  let fechaActual = new Date();
  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  console.log(registros[0].nacimiento);
  console.log(edad);
  document.getElementById("txt-nacimiento").innerHTML = edad;
};

const cargarImagen = async (foto) => {
  let elementoImagen = document.getElementById("foto");
  elementoImagen.src = foto;
};

const cargarPagina = async () => {
  const inicio = new Date();
  registros = await obtenerDatos("obtener-registros");
  listaPesos = await obtenerListaDatos("/obtener-pesos");
  calcularProteina();
  cargarPerfil();
  calcularEdad();
  cargarPeso();
  calcularIMCInicio();
  calcularIMC();
  calcularAgua();
  cargarImagen(registros[0].foto);
  const final = new Date();
  console.log(final - inicio);
};

window.onload = cargarPagina();
