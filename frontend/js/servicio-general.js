const registrarDatos = async(endpoint, data, redireccion = undefined) => {
    let url = `http://localhost:3000/api/${endpoint}`;

    await axios({
            url: url,
            method: "post",
            responseType: "json",
            data: data,
        })
        .then((response) => {
            Swal.fire({
                icon: "success",
                title: "Registro realizado con éxito",
                text: response.data.msj,
            }).then(() =>{
                if(redireccion !== undefined){
                    window.location.href = redireccion;
                }
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Ha ocurrido un error",
                text: error,
            });
        });
};
const registrarPesos = async(pdatos, pendPointA) => {
    let urlRegistrar = "http://localhost:3000/api";
    urlRegistrar += pendPointA;

    await axios({
        method: "post",
        url: urlRegistrar,
        data: pdatos,
    });
};

const obtenerDatos = async(endpoint) => {
    let url = `http://localhost:3000/api/${endpoint}`;
    let listaDatos = [];
    await axios({
            url: url,
            method: "get",
            responseType: "json",
        })
        .then((response) => {
            listaDatos = response.data.lista;
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                text: error,
            });
        });

    return listaDatos;
};

const eliminarDatos = async(endpoint, _id) => {
    let url = `http://localhost:3000/api/${endpoint}`;
    await axios({
            url: url,
            method: "delete",
            responseType: "json",
            data: {
                _id: _id,
            },
        })
        .then((response) => {
            Swal.fire({
                icon: "success",
                title: response.data.msj,
            }).then(() => {
                window.location.reload();
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                text: error,
            });
        });
};
const obtenerListaDatos = async(pendPoint) => {
    let url = "http://localhost:3000/api";
    let listaDatos = [];
    url += pendPoint;

    await axios({
        method: "get",
        url: url,
    }).then((response) => {
        listaDatos = response.data.lista;
    });

    return listaDatos;
};