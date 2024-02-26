const apiUrl = "http://localhost:3000/api";

let planBtns = document.querySelectorAll(".btn");

let inputFecha1 = document.getElementById("input-fecha-1");
let inputFecha2 = document.getElementById("input-fecha-2")

function resetPlanBtns() {
    planBtns.forEach(b => {
        b.classList.remove("invalido")
    })
}


// Plan de ayuno

let planSeleccionado = "";

function formatTiempo(d) {
    return `${d.getHours() > 9 ? d.getHours() : "0" + d.getHours()}:${d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes()}:${d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds()}`;
}

function obtenerEmpezarTiempo(horas) {
    const d = new Date(0, 0, 0, horas);
    return formatTiempo(d);
}


function horasEnPlan(plan) {
    return plan.split(":")[0];
}

document.getElementById("btn-principiante").addEventListener("click", function() {
    resetPlanBtns();
    planSeleccionado = "14:10";
    document.getElementById("ayuno-plan-text").innerText = planSeleccionado;
    document.getElementById("timer-empezar-ayuno").innerText = obtenerEmpezarTiempo(horasEnPlan(planSeleccionado));
})
document.getElementById("btn-intermedio").addEventListener("click", function() {
    resetPlanBtns();
    planSeleccionado = "16:8";
    document.getElementById("ayuno-plan-text").innerText = planSeleccionado;
    document.getElementById("timer-empezar-ayuno").innerText = obtenerEmpezarTiempo(horasEnPlan(planSeleccionado));
})
document.getElementById("btn-avanzado").addEventListener("click", function() {
    resetPlanBtns();
    planSeleccionado = "18:6";
    document.getElementById("ayuno-plan-text").innerText = planSeleccionado;
    document.getElementById("timer-empezar-ayuno").innerText = obtenerEmpezarTiempo(horasEnPlan(planSeleccionado));
})
document.getElementById("btn-experto").addEventListener("click", function() {
    resetPlanBtns();
    planSeleccionado = "20:4";
    document.getElementById("ayuno-plan-text").innerText = planSeleccionado;
    document.getElementById("timer-empezar-ayuno").innerText = obtenerEmpezarTiempo(horasEnPlan(planSeleccionado));
})



// Progreso

const diasEnMes = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
}

function obtenerAyunos() {
    const mesAno = document.getElementById("buscar-mes").value;
    const [ano, mes] = mesAno.split("-").map(el => { return parseInt(el) });

    axios.get(`${apiUrl}/obtener-ayunos`)
        .then(function(res) {
            // console.log(res.data.lista);

            const ayunos = res.data.lista;

            const listaDias = document.getElementById("dias");
            listaDias.innerHTML = "";

            for (let i = 1, dem = (mes - 1 == 1 && ano % 4 == 0) ? diasEnMes[mes - 1] + 1 : diasEnMes[mes - 1]; i <= dem; i++) {
                const ayunoEnDia = ayunos.filter(ayuno => {
                    return (new Date(ayuno.fecha).getFullYear() === ano &&
                        new Date(ayuno.fecha).getMonth() === mes - 1 &&
                        new Date(ayuno.fecha).getDate() === i)
                })

                // console.log(ayunoEnDia);

                let exito = undefined;
                if (ayunoEnDia.length > 0) {
                    // console.log(ayunoEnDia[0].plan * 60 * 60 * 1000, ayunoEnDia[0].tiempoayuno);
                    // console.log(ayunoEnDia[0].fecha);
                    if (((ayunoEnDia[0].plan * 60 * 60 * 1000) - ayunoEnDia[0].tiempoayuno) <= 0) {
                        // console.log(i);
                        exito = "si";
                    } else {
                        exito = "no";
                    }
                }
                listaDias.innerHTML += `<li><span${exito ? ((exito == "si") ? " class='exito'" : " class='fallo'") : ""}>${i}</span></li>`;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

document.getElementById("buscar-mes").value = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}`;
obtenerAyunos();

document.getElementById("buscar-mes").addEventListener("change", obtenerAyunos);


// Añadir

inputFecha1.addEventListener("change", function() {
    inputFecha1.classList.remove("invalido");
    inputFecha2.classList.remove("invalido");
})
inputFecha2.addEventListener("change", function() {
    inputFecha1.classList.remove("invalido");
    inputFecha2.classList.remove("invalido");
})

document.getElementById("button-set-ayuno").addEventListener("click", function() {
    if (planSeleccionado == "") {
        planBtns.forEach(b => {
            b.classList.add("invalido");
        })
        Swal.fire({
            title: 'Alerta',
            text: '¡Por favor selecione un plan de ayuno!',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
        return;
    }


    if (inputFecha1.value == "") {
        inputFecha1.classList.add("invalido");
        Swal.fire({
            title: 'Alerta',
            text: '¡Por favor selecione una fecha de inicio!',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
        return;
    }
    if (inputFecha2.value == "") {
        inputFecha2.classList.add("invalido");
        Swal.fire({
            title: 'Alerta',
            text: '¡Por favor selecione una fecha de fin!',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
        return;
    }

    const fecha1 = new Date(inputFecha1.value);
    const fecha2 = new Date(inputFecha2.value);

    obtenerEmpezarTiempo(horasEnPlan(planSeleccionado))

    let delta = fecha2.getTime() - fecha1.getTime();

    if (delta < 0) {
        inputFecha1.classList.add("invalido");
        inputFecha2.classList.add("invalido");
        Swal.fire({
            title: 'Alerta',
            text: '¡Fechas incorrectas, por favor selecione fechas correctas!',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
        return;
    }

    const tiempoTotal = new Date(0, 0, 0, delta / (1000 * 60 * 60), delta / (1000 * 60), delta / 1000);

    console.log(fecha1, fecha2, formatTiempo(tiempoTotal))

    const model = {
        plan: horasEnPlan(planSeleccionado),
        tiempoayuno: delta,
        fecha: fecha1
    }

    axios.post(`${apiUrl}/registrar-ayuno`, model)
        .then(function(res) {
            console.log(res);
            Swal.fire({
                title: 'Ayuno guardado',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            obtenerAyunos();
        })
        .catch(function(error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: error,
                confirmButtonText: 'Ok'
            })
        });
})


// Cronometro

let timer = undefined;
let tiempoInicio = undefined;
let tiempoFinal = undefined;

document.getElementById("button").addEventListener("click", function() {
    if (planSeleccionado == "") {
        planBtns.forEach(b => {
            b.classList.add("invalido");
        })
        Swal.fire({
            title: 'Alerta',
            text: '¡Por favor selecione un plan de ayuno!',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
        return;
    }

    document.querySelector(".menu-inicio").style.display = "none";
    document.querySelector(".menu-emergente").style.display = "flex";

    const horasTotal = new Date(0, 0, 0, horasEnPlan(planSeleccionado));
    const horasAhora = new Date(horasTotal);

    tiempoInicio = new Date();

    let eta = new Date(tiempoInicio.getTime() + horasTotal.getTime());

    document.getElementById("timer-inicio-del-ayuno").innerText = tiempoInicio.toLocaleTimeString();
    document.getElementById("timer-fin-del-ayuno").innerText = eta.toLocaleTimeString();

    timer = setInterval(() => {
        document.getElementById("timer-correr-ayuno").innerText = formatTiempo(horasAhora);
        horasAhora.setSeconds(horasAhora.getSeconds() - 1);
        console.log(horasAhora.getHours() * 60 * 60 + horasAhora.getMinutes() * 60 + horasAhora.getSeconds());
        if ((horasAhora.getHours() * 60 * 60 + horasAhora.getMinutes() * 60 + horasAhora.getSeconds()) < 1) {
            finalizarCronometro();
        }
    }, 1000)
})

function finalizarCronometro() {
    clearInterval(timer);
    document.querySelector(".menu-emergente").style.display = "none";
    document.querySelector(".menu-inicio").style.display = "flex";

    tiempoFinal = new Date();

    let delta = tiempoFinal.getTime() - tiempoInicio.getTime();

    const tiempoTotal = new Date(0, 0, 0, delta / (1000 * 60 * 60), delta / (1000 * 60), delta / 1000);

    console.log(tiempoInicio, tiempoFinal, formatTiempo(tiempoTotal))

    const model = {
        plan: horasEnPlan(planSeleccionado),
        tiempoayuno: delta,
        fecha: tiempoInicio
    }

    axios.post(`${apiUrl}/registrar-ayuno`, model)
        .then(function(res) {
            console.log(res);
            Swal.fire({
                title: 'Ayuno guardado',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            obtenerAyunos();
        })
        .catch(function(error) {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: error,
                confirmButtonText: 'Ok'
            })
            console.log(error);
        });
}

document.getElementById("btn-terminar-ayuno-emergente").addEventListener("click", finalizarCronometro)