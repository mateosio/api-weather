const API_KEY = "033ffc66c5177cc7178a59750e2932ce";
const URL = "https://api.openweathermap.org/geo/1.0/direct?";

const botonInput = document.getElementById("btnClima");
const elementoDatos = document.getElementById('datos');
const imgFondoClima = document.getElementById('container');
const enter = document.getElementById('inputClima');

let objetoGuardados;
let tempMax;
let tempMin;
let termica;
let humedad;
let presion;
let velocidadViento;    
let elementoInput;

// Los addEventListener...(click y enter)
botonInput.addEventListener("click", consultarLocalStorage);
enter.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        consultarLocalStorage ()
    }
});

function render(data) {

            tempMax = (data.main.temp_max - 273.15).toFixed(1) + "°C";
            tempMin = Math.floor(data.main.temp_min - 273.15).toFixed(1) + "°C";
            termica = Math.floor(data.main.feels_like - 273.15).toFixed(1) + "°C";
            humedad = data.main.humidity;
            presion = data.main.pressure;
            velocidadViento = data.wind.speed; 
            let clima = data.weather[0].main;

            elementoDatos.innerHTML = `
                <h2 class="fs-4 text-uppercase p-2 fw-bolder">Temperatura en ${elementoInput}</h2>
                <p><span class="fw-bolder">Temperatura máxima:</span> ${tempMax}</p>
                <p><span class="fw-bolder">Temperatura mínima:</span> ${tempMin}</p>
                <p><span class="fw-bolder">Humedad:</span> ${humedad}%</p>
                <p><span class="fw-bolder">Sensación térmica:</span> ${termica}</p>
                <p><span class="fw-bolder">Presión atmosférica:</span> ${presion} hPa</p>
                <p><span class="fw-bolder">Viento a:</span> ${velocidadViento} km/h</p>
            `
           
            if(clima == "Clouds"){
                imgFondoClima.classList.remove("clear","rain","snow");
                imgFondoClima.classList.add("clouds");
          
            }if(clima == "Clear"){  
                imgFondoClima.classList.remove("clouds","rain","snow");
                imgFondoClima.classList.add("clear");
            }
            if(clima == "Rain"){
                imgFondoClima.classList.remove("clouds","clear","snow");
                imgFondoClima.classList.add("rain");  
            }
            if(clima == "Snow"){
                imgFondoClima.classList.remove("clouds","clear", "rain");
                imgFondoClima.classList.add("snow");   
            }
        


    };

function getDataApi (elementoInput){
    
    fetch(`${URL}q=${elementoInput}&appid=${API_KEY}`) 
    .then(response => response.json())
    .then((data)=> {
        
        if(data.length == 0){
            alert("El dato ingresado no existe");
            
        }else{
            let latitud = data[0].lat;
            let longitud = data[0].lon;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${API_KEY}`)
            .then(response => response.json())
            .then((data) => {
            
            //Guardo en storage: llamo a la variable global objetoGuardados, le digo que cree una propiedad con el dato que llegue al elementoInput e igualo el valor de esa propiedad a la data que hay en la api...
            objetoGuardados[elementoInput] = data;
            localStorage.setItem(elementoInput, JSON.stringify(objetoGuardados));
            render(data);
            

            });
        }
    });
};

//Consulta al LocalStorage...

function consultarItem(elementoInput) {
    let itemStorage = JSON.parse(localStorage.getItem(elementoInput));
    let itemUno;

if(itemStorage){
    itemUno = itemStorage;
}else{
    itemUno = {};                 
}
return itemUno
};


function consultarLocalStorage () {
    elementoInput = document.getElementById("inputClima").value;
    if(elementoInput === ""){
        return alert("Debes ingresar un valor valido")
    };

    objetoGuardados = consultarItem(elementoInput);
    console.log(objetoGuardados);

    if(objetoGuardados[elementoInput]){
        render(objetoGuardados[elementoInput]);
    }
    else{
       getDataApi(elementoInput);
    }

};