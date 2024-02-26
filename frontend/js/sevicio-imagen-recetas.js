"use strict";

const botonReceta = document.querySelector("#btn-img");
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

botonReceta.addEventListener(
  "click",
  () => {
    widget_cloudinary.open();
  },
  false
);
