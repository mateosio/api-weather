const API_KEY = "033ffc66c5177cc7178a59750e2932ce";
const URL = "https://api.openweathermap.org/geo/1.0/direct?";

const elementoBotonInput = document.getElementById("btnClima");
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
