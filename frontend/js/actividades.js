'use strict';

const cuerpoTabla = document.querySelector('#tbl-actividades tbody');
const mesHistorial = document.getElementById('mes-historial');

const buscarActividad = document.getElementById('buscar-actividad');
const buscarMes = document.getElementById('buscar-mes');
const buscarHora = document.getElementById('buscar-hora');
const buscarFrecuencia = document.getElementById('buscar-frecuencia');

const tablaBuscar = document.querySelector('#tbl-buscar-actividad tbody');


let listaActividades = [];

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

function mismoDia(a, b) {
    const da = new Date(a.fecha);
    const db = new Date(b.fecha);
    return da.getFullYear() == db.getFullYear() &&
            da.getMonth() == db.getMonth() &&
            da.getDate() == db.getDate()
}

function calcularTotales(listaActividades) {
    let l = []

    listaActividades.forEach( a => {
        if( l.find((la => {
                return mismoDia(la, a)
            }))
        ) {
            return;
        }

        l.push({
            ...a, frecuencia: 1
        });

        listaActividades.forEach( b => {
            if(a == b) {
                return;
            } else if ( a.actividad == b.actividad && mismoDia(a, b) ) {
                let i = l.findIndex(la => {return la.actividad == a.actividad && mismoDia(la, a)});
                if( i >= 0 ) {
                    l[i].horas += b.horas;
                    l[i].frecuencia++;
                }
            }
        })
    }) 

    return l;
} 

const inicializarListas = async() => {
    listaActividades = await obtenerDatos('/obtener-actividades');
    mostrarGrafico();
    mostrarTabla();
};

const mostrarGrafico = async() => {
    const [ano, mes] = mesHistorial.value.split("-").map(el => {return parseInt(el)});
    console.log(ano, mes);
    console.log(listaActividades.length, calcularTotales(listaActividades));

    const xValues = []
    for (let i = 1; i <= diasEnMes[mes-1]; i++) {
        xValues.push(i);
    }

    const listaActividadesConTotales =  calcularTotales(listaActividades);

    const listaActividadesEnMes = listaActividadesConTotales.filter(a => {
        const fecha =  new Date(a.fecha);
        return fecha.getFullYear() == ano && fecha.getMonth() == mes-1;
    })

    function prepararGrafico(actividad, listaActividades) {
        return (
            listaActividades.filter(a => {
                return a.actividad == actividad
            })
            .sort((a, b) => {return new Date(a.fecha).getTime() - new Date(b.fecha).getTime()})
            .map(a => {
                console.log(a.actividad, new Date(a.fecha).getTime());
                return {
                    x: new Date(a.fecha).getDate(),
                    y: a.horas
                }
            })
        )
    }

    let listaGrafico = {
        correr: prepararGrafico("correr", listaActividadesEnMes),
        nadar: prepararGrafico("nadar", listaActividadesEnMes),
        bicicleta: prepararGrafico("bicicleta", listaActividadesEnMes),
        basketball: prepararGrafico("basketball", listaActividadesEnMes),
    }

    new Chart("grafico", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Correr",
                data: listaGrafico.correr,
                borderColor: "red",
                fill: false
            },{
                label: "Nadar",
                data: listaGrafico.nadar,
                borderColor: "green",
                fill: false
            },{
                label: "Bicicleta",
                data: listaGrafico.bicicleta,
                borderColor: "blue",
                fill: false
            },{
                label: "Basketball",
                data: listaGrafico.basketball,
                borderColor: "orange",
                fill: false
            }]
        },
        options: {
            legend: {display: true}
        }
    });

    // console.log(mesHistorial.selectedIndex);

    // const actividadesEnMes = listaActividades.filter(actividad => {
    //     let fecha = new Date(actividad.fecha);
    //     const mes = fecha.getMonth();
    //     return mes == mesHistorial.selectedIndex
    // })

    // actividadesEnMes.forEach(actividad => {
    //     console.log(actividad);
    // });
}

const mostrarTabla = async() => {
    cuerpoTabla.innerHTML = '';

    listaActividades.forEach(actividad => {
        let fila = cuerpoTabla.insertRow();

        fila.insertCell().innerText = new Date(actividad.fecha).toLocaleDateString();
        fila.insertCell().innerText = actividad.actividad;
        fila.insertCell().innerText = actividad.horas;
    });
};


const buscarPorActividad = async() => {
    console.log(buscarActividad.value);
    tablaBuscar.innerHTML = '';

    
    const filtroPorActividad = listaActividades.filter(actividad => {
        return actividad.actividad == buscarActividad.value
    })

    console.log(filtroPorActividad);

    
    filtroPorActividad.forEach(actividad => {
        let fila = tablaBuscar.insertRow();

        fila.insertCell().innerText = new Date(actividad.fecha).toLocaleDateString();
        fila.insertCell().innerText = actividad.actividad;
        fila.insertCell().innerText = actividad.horas;
        fila.insertCell().innerText = "-"; //TODO
    });
}

const buscarPorMes = async() => {
    const [ano, mes] = buscarMes.value.split("-").map(el => {return parseInt(el)});
    console.log(buscarActividad.value, ano, mes);
    tablaBuscar.innerHTML = '';

    const listaActividadesEnMes = listaActividades.filter(a => {
        const fecha =  new Date(a.fecha);
        return fecha.getFullYear() == ano && fecha.getMonth() == mes-1;
    })

    console.log(listaActividadesEnMes);

    
    listaActividadesEnMes.forEach(actividad => {
        let fila = tablaBuscar.insertRow();

        fila.insertCell().innerText = new Date(actividad.fecha).toLocaleDateString();
        fila.insertCell().innerText = actividad.actividad;
        fila.insertCell().innerText = actividad.horas;
        fila.insertCell().innerText = "-"; //TODO
    });
}

const buscarPorHora = async() => {
    tablaBuscar.innerHTML = '';

    const listaActividadesPorHora = listaActividades.filter(a => {
        console.log(a.horas, buscarHora.value);
        return a.horas == parseInt(buscarHora.value)
    })

    listaActividadesPorHora.forEach(actividad => {
        let fila = tablaBuscar.insertRow();

        fila.insertCell().innerText = new Date(actividad.fecha).toLocaleDateString();
        fila.insertCell().innerText = actividad.actividad;
        fila.insertCell().innerText = actividad.horas;
        fila.insertCell().innerText = "-"; //TODO
    });
}

const buscarPorFrecuencia = async() => {
    tablaBuscar.innerHTML = '';





    // listaActividades.forEach(a => {
    //     const da = new Date(a.fecha);
    //     if(lista.find(l => {
    //         const dl = new Date(l.fecha);
    //         return dl.getFullYear() == da.getFullYear() &&
    //                 dl.getMonth() == da.getMonth() &&
    //                 dl.getDate() == da.getDate()
    //     })) {
    //         return;
    //     }
    //     listaActividades.forEach(b => {
    //         if(a != b) {
    //             const db = new Date(b.fecha);
    //             if(a.actividad == b.actividad && 
    //                 da.getFullYear() == db.getFullYear() &&
    //                 da.getMonth() == db.getMonth() &&
    //                 da.getDate() == db.getDate()) {
    //                     lista.push({
    //                         actividad: a.actividad,
    //                         horas: a.horas + b.horas,
    //                         fecha: a.fecha
    //                     })
    //             }
    //         }
    //     })
    // })

    const listaTotales = calcularTotales(listaActividades)

    console.log(listaTotales);

    const listaPorFrecuencia = listaTotales.filter(a => {
        // console.log(a.frecuencia, buscarFrecuencia.value);
        return a.frecuencia == buscarFrecuencia.value
    })

    listaPorFrecuencia.forEach(actividad => {
        let fila = tablaBuscar.insertRow();

        fila.insertCell().innerText = new Date(actividad.fecha).toLocaleDateString();
        fila.insertCell().innerText = actividad.actividad;
        fila.insertCell().innerText = actividad.horas;
        fila.insertCell().innerText = actividad.frecuencia;
    });
}


// inicializar mes
mesHistorial.value = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}`;
buscarMes.value = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}`;

mesHistorial.addEventListener('change', mostrarGrafico)

buscarActividad.addEventListener('change', buscarPorActividad)
buscarMes.addEventListener('change', buscarPorMes)
buscarHora.addEventListener('change', buscarPorHora)
buscarFrecuencia.addEventListener('change', buscarPorFrecuencia)


inicializarListas();


'use strict';

const fechaActividad = document.getElementById('input-fecha-actividad');
const nombreActividad = document.getElementById('actividades-menu');
const numHoras = document.getElementById('slt-horas');
const botonAgregarActividad = document.getElementById('btn-agregar-actividad');

const registrarActividad = () => {
    //recordar poner el nombre igual de los valores JSON que como sale en el route
    let actividad = {
        "actividad": nombreActividad.value,
        "horas": numHoras.value,
        "fecha": fechaActividad.value
    };
    registrarDatos('registrar-actividad', actividad);
    inicializarListas();
};

const validar = () => {
    let error = false;
    let camposRequeridos = document.querySelectorAll('.requerido');

    camposRequeridos.forEach(campo => {
        if (campo.value == "") {
            campo.classList.add('input-error');
            error = true;
        } else {
            campo.classList.remove('input-error');
        }
    });

    if (error) {
        Swal.fire({
            'title': 'Registro Incorrecto',
            'text': 'Por favor llene los campos',
            'icon': 'warning'
        });
    } else {
        registrarActividad();
    }
};



botonAgregarActividad.addEventListener('click', validar)