"use strict";

const botonFoto = document.querySelector("#btn-foto");
const imagen = document.querySelector("#foto");
let widget_cloudinary = cloudinary.createUploadWidget(
  {
    cloudName: "fullsnackdevs",
    uploadPreset: "foto_registro",
  },
  (err, result) => {
    if (!err && result && result.event === "success") {
      console.log("Imagen subida con éxito", result.info);
      imagen.src = result.info.secure_url;
    }
  }
);

botonFoto.addEventListener(
  "click",
  () => {
    widget_cloudinary.open();
  },
  false
);
