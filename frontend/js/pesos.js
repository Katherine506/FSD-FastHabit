moment.locale("es");
const peso = document.querySelector(".peso");
const fecha = document.querySelector(".dia");
const tablaHistorial = document.querySelector(".tabla tbody");
const btnGuardar = document.querySelector(".btn-guardar");
const btnSalir = document.querySelector(".btn-salir");
const btnActualizacion = document.querySelector(".btn-actualizar");
const inputContainer = document.querySelector(".inputContainer");
const progressSinDatos = document.querySelector(".progress");
let fechasGrafica = [];
let pesosGrafica = [];
const colorFondo = ["#82ccdd"];
const progress = document.querySelector(".progress-done");
let imc = 0;

const validarFecha = async() => {
    let error = false;
    let fechaInput = new Date(fecha.value);
    let fechaActual = new Date();
    let mesInput = (fechaInput.getMonth() + 1).toString();
    let mesActual = (fechaActual.getMonth() + 1).toString();
    let diaInput = (fechaInput.getDate() + 1).toString();
    let diaActual = fechaActual.getDate().toString();
    let annoInput = fechaInput.getFullYear().toString();
    let annoActual = fechaActual.getFullYear().toString();
    let fechaInputFinal = diaInput + "-" + mesInput + "-" + annoInput;
    let fechaActualFinal = diaActual + "-" + mesActual + "-" + annoActual;

    if (peso.value == "") {
        error = true;
        peso.classList.add("input-error");
        Swal.fire({
            icon: "warning",
            title: "No se ha ingresado un peso",
            text: "Revise los campos resaltados",
            confirmButtonColor: "#82ccdd",
        });
    } else {
        peso.classList.remove("input-error");
    }
    if (fechaInputFinal !== fechaActualFinal) {
        error = true;
        fecha.classList.add("input-error");
        Swal.fire({
            icon: "warning",
            title: "La fecha no puede ser distinta a la actual",
            text: "Revise los campos resaltados",
            confirmButtonColor: "#82ccdd",
        });
    } else {
        fecha.classList.remove("input-error");
    }
    if (error == false) {
        registarInfo();

        Swal.fire({
            icon: "success",
            title: "Se ha actualizado el peso",
            text: "Revise las actualizaciones del perfil",
            confirmButtonColor: "#82ccdd",
        });
    } else {
        console.log("Por favor rellene los campos resaltados");
    }
};

const registarInfo = async() => {
    let pesos = {
        peso: peso.value,
        fecha: fecha.value,
    };
    registrarPesos(pesos, "/registrar-pesos");
};
const progreso = document.querySelector(".progreso-done");
const pesoObjetivo = document.querySelector(".peso-objetivo");

let pesoIdeal = 0;

const changeWidth = async() => {
    listaRegistros.forEach((registros) => {
        altura = registros.altura;
    });

    listaPesos.forEach((pesos) => {
        let imc = pesos.peso / (altura * 0.01 * (altura * 0.01));
        let porcentaje = `${imc}%`;
        let porcentajeTxt = "";
        progress.style.width = porcentaje;
        if (imc >= 40) {
            progress.className = "";
            porcentajeTxt = "Obesidad-3";
            progress.style.width = `${100}%`;
            progress.classList.add("obesidad-3");
            progress.classList.add("progress-done");
        } else {
            if (imc >= 35) {
                progress.className = "";
                porcentajeTxt = "Obesidad-2";
                progress.classList.add("obesidad-2");
                progress.classList.add("progress-done");
            } else {
                if (imc >= 30) {
                    progress.className = "";
                    porcentajeTxt = "Obesidad-1";
                    progress.classList.add("obesidad-1");
                    progress.classList.add("progress-done");
                } else {
                    if (imc >= 25) {
                        progress.className = "";
                        porcentajeTxt = "Sobrepeso";
                        progress.classList.add("sobrepeso");
                        progress.classList.add("progress-done");
                    } else {
                        if (imc >= 18.5) {
                            progress.className = "";
                            porcentajeTxt = "Normal";
                            progress.classList.add("normal");
                            progress.classList.add("progress-done");
                        } else {
                            if (imc < 18.5) {
                                porcentajeTxt = "Bajo";
                                progress.classList.add("bajo");
                                progress.classList.add("progress-done");
                            }
                        }
                    }
                }
            }
        }

        progress.innerText = porcentajeTxt;
        inputContainer.innerText = imc.toFixed(2);
    });
};

const barraProgresoObj = async() => {
    listaPesos.forEach((pesos) => {
        let porcentajeObj = `${
      100 - (Math.abs(pesos.peso - pesoIdeal) / pesos.peso) * 100
    }%`;

        let porcentajeTxtObj = `${(
      100 -
      (Math.abs(pesos.peso - pesoIdeal) / pesos.peso) * 100
    ).toFixed(1)}%`;
        progreso.style.width = porcentajeObj;
        progreso.innerText = porcentajeTxtObj;
    });
};

const ActualizarPesoObjetivo = async() => {
    listaPesos.forEach((pesos) => {
        pesoActual = parseFloat(pesos.peso);
    });
    listaRegistros.forEach((registros) => {
        pesoIdeal = registros.pesoIdeal;
    });

    valorPesoIdeal = document.querySelector(".valor-peso-ideal").innerHTML =
        pesoIdeal + "Kg";
    barraProgresoObj();
};

let historial = {};

const ingresarPeso = () => {
    document.querySelector(".ingresar-peso").style.display = "block";
};
const salir = () => {
    document.querySelector(".ingresar-peso").style.display = "none";
};

let listaPesos = [];

const inicializarListas = async() => {
    listaPesos = await obtenerListaDatos("/obtener-pesos");
    listaRegistros = await obtenerDatos("obtener-registros");
    actualizarPeso();

    desplegarGrafica();

    imprimirTabla();

    ActualizarPesoObjetivo();

    barraProgresoObj();

    changeWidth();
};

const imprimirTabla = async() => {
    tablaHistorial.innerHTML = "";
    listaPesos.forEach((pesos) => {
        let fila = tablaHistorial.insertRow();
        fechaFormato = moment(pesos.fecha).add(1, "days").format("MM-DD-YYYY");
        fila.insertCell().innerText = fechaFormato;
        fila.insertCell().innerText = pesos.peso + "Kg";
    });
};

const desplegarGrafica = async() => {
    let xFechas = [];
    let yPesos = [];

    listaPesos.forEach((pesos) => {
        xFechas.push(moment(pesos.fecha).add(1, "days").format("MM-DD-YYYY"));
        yPesos.push(pesos.peso);
    });

    new Chart("myChart", {
        type: "line",
        data: {
            labels: xFechas,
            datasets: [{
                backgroundColor: colorFondo,
                data: yPesos,
            }, ],
        },
        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Historial Peso",
            },
        },
    });
};
const actualizarPeso = async() => {
    listaPesos.forEach((pesos) => {
        pesoActualizado = document.querySelector(".peso-actual").innerHTML =
            pesos.peso + "Kg";
        pesoActualizado = document.querySelector(".valor-peso-actual").innerHTML =
            pesos.peso + "Kg";
    });
    listaRegistros.forEach((registros) => {
        altura = registros.altura;
    });

    let imc = 21.7;
    let pesoIdoneo = imc * (altura * 0.01 * altura * 0.01);

    pesoIdeal = document.querySelector(".pesoIdealActualizado").innerHTML =
        pesoIdoneo.toFixed(1) + "Kg";
};

window.onload = inicializarListas();

btnGuardar.addEventListener("click", validarFecha);
btnSalir.addEventListener("click", salir);
btnActualizacion.addEventListener("click", ingresarPeso);