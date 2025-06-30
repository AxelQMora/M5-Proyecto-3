document.addEventListener('DOMContentLoaded', function () {
    ///Verify that the date is correct for the API
    const inputDate = document.getElementById("search-input");
    const BASE_URL_API = "https://api.nasa.gov/planetary/apod";
    const image = document.getElementById("image");
    const title = document.getElementById("title");
    const titleSpace = document.getElementById("titleSpace");
    const date = document.getElementById("date");
    const dateSpace = document.getElementById("dateSpace");
    const explanation = document.getElementById("explanation");
    const explanationSpace = document.getElementById("explanationSpace");
    const link = document.getElementById("link");
    const linkSpace = document.getElementById("linkSpace");
    let fechaFormateada = '';
    const axiosButton = document.getElementById("axiosButton");
    const fetchButton = document.getElementById("fetchButton");

    //GET
    //Definimos la request con AXIOS
    function getImage(date, callback) {
        axios.get(`${BASE_URL_API}?date=${fechaFormateada}&api_key=eXrS5Mks8b7cPtTe8mvykdmqzKKLwhdc734DbCRk`)
            .then(response => callback(null, response.data)) //Caso exitoso
            .catch(error => callback(error, null)); //Caso error
    }

    //Definimos la request con FETCH
    async function getImageFetch() {
    try {
        const responseFetch = await fetch(`${BASE_URL_API}?date=${fechaFormateada}&api_key=eXrS5Mks8b7cPtTe8mvykdmqzKKLwhdc734DbCRk`);

        if (!responseFetch.ok) {
            throw new Error('HTTP error ' + responseFetch.status);
        }

        const data = await responseFetch.json();
        return data; // Devuelve el objeto con la información de la API
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
        return null; // Puedes devolver null o un objeto vacío si quieres continuar el flujo
    }
}

    //Funcion que procesará la respuesta, incluyendo errores
    function responseProcessing(error, object) {
        if (error) {
            console.error('Error: ', error.message)
        } else {
            console.log(`Successful - Title: ${object.title}`) //Mensaje de prueba
            pageUpdate(object);
        }
    }
    //Función para ahorrar espacio
     function pageUpdate(object) {
        //imagen
        image.style.backgroundImage = `url(${object.url})`;

        //Title
        titleSpace.textContent = object.title;

        //Date
        dateSpace.textContent = object.date;

        //Explanation 
        explanationSpace.textContent = object.explanation.split(" ").slice(0, 50).join(" ") + "...";;

        //Link
        linkSpace.textContent = object.url;
    }
    //Guardamos los cambios en la fecha
    inputDate.addEventListener("change", () => {
        // Evita usar new Date(inputDate.value) directamente
        // porque crea un desfase de zona horaria (UTC vs. local)

        // Extraemos la fecha directamente del input sin crear un objeto Date
        const [yyyy, mm, dd] = inputDate.value.split("-");

        // Reconstruimos la fecha formateada sin errores
        fechaFormateada = `${yyyy}-${mm}-${dd}`;

        console.log("Fecha formateada:", fechaFormateada);

    });


    //Click en AXIOS
    axiosButton.addEventListener("click", () => {
        getImage(fechaFormateada, responseProcessing);
    });

    //Click en Fetch
    fetchButton.addEventListener("click", () => {
        async function clickFetch() {
            const dataFetch = await getImageFetch();
            pageUpdate(dataFetch);
        }

        clickFetch();
    });

});