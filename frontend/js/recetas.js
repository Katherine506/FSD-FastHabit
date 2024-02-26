// Declaracion de variables.
const inputImagen = document.getElementById("foto");
const txtNombreReceta = document.getElementById("input-nombre");
const txtIngredientes = document.getElementById("input-ingredientes");
const txtOpcionesComida = document.getElementById("opciones-tipo-comida");
const txtCategoriaComida = document.getElementById("opciones-categoria-comida");
const txtPreparacion = document.getElementById("ingreso-preparacion");
const Secsct = document.getElementById("sct");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroCategoria = document.getElementById("filtro-categoria");
const btnAgregar = document.getElementById("btn-agregar");

//Registro de recetas.
const registrarReceta = () => {
    let receta = {
        imagen: inputImagen.src,
        nombre: txtNombreReceta.value,
        ingredientes: txtIngredientes.value,
        tipo: txtOpcionesComida.value,
        categoria: txtCategoriaComida.value,
        preparacion: txtPreparacion.value,
    };

    registrarDatos("registrar-receta", receta);
};

//Validacion del registro.
const validar = () => {
    let error = false;

    let camposRequeridos = document.querySelectorAll(".requerido");
    console.log(camposRequeridos);
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
            title: "Registro incompleto",
            text: "Por favor complete los campos resaltados",
            icon: "warning",
        });
    } else {
        registrarReceta();
    }
};

btnAgregar.addEventListener("click", validar);

//Listado de recetas

const mostrarRecetas = (listaRecetas) => {
    const listaHTML = listaRecetas.map((receta) => {
        console.log(receta);
        const card = `<div class="card">
                            <div>
                                <h3>${receta.nombre}</h3>
                                <div style="display:flex; align-items:center; justify-content:flex-start; font-weight:600; width:300px">
                                    <img class="recetaimg" src=${receta.imagen}>
                                    <div style="padding-left: 10px">
                                        <p>Categoría: ${receta.categoria}</p> 
                                        <p>Tipo: ${receta.tipo}</p>
                                    </div>
                                </div>
                                <p class="resultados" style="font-weight:600">Ingredientes: ${receta.ingredientes}</p>
                                <p class="resultados" style="font-weight:600">Preparación:${receta.preparacion}</p>
                            
                            </div>
                        </div>`;
        return card;
    });

    Secsct.innerHTML = listaHTML.join("");
};

const cargarLista = async() => {
    let listaRecetas = await obtenerDatos("listar-recetas");
    mostrarRecetas(listaRecetas);
};

cargarLista();

//Filtrado de Recetas

const btnFiltrar = document.getElementById("btn-filtrar");

btnFiltrar.addEventListener("click", async function() {
    // let tipo = document.getElementById("filtro-tipo").value;
    // let categoria = document.getElementById("filtro-categoria").value;
    let listaRecetas = await obtenerDatos("listar-recetas");
    const copia = [...listaRecetas];

    const arrayFiltrado = copia
        .filter((elemento) => {
            if (filtroTipo.value == "") {
                return true;
            }

            return (
                elemento.tipo.toLowerCase().trim() ==
                filtroTipo.value.toLowerCase().trim()
            );
        })
        .filter((elemento) => {
            if (filtroCategoria.value == "") {
                return true;
            }

            return (
                elemento.categoria.toLowerCase().trim() ==
                filtroCategoria.value.toLowerCase().trim()
            );
        });
    mostrarRecetas(arrayFiltrado);
});