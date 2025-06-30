document.addEventListener('DOMContentLoaded', function() {
    ///Verify that the date is correct for the API
    const inputFecha = document.getElementById("fecha");

  inputFecha.addEventListener("change", () => {
    const fecha = new Date(inputFecha.value);
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    const fechaFormateada = `${yyyy}-${mm}-${dd}`;
    console.log("Fecha formateada:", fechaFormateada);
  });




});