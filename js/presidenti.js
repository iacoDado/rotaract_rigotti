const FORM = document.getElementById("formPresidente");

FORM.addEventListener("submit", e => {controllo(e)});
const nome = document.getElementById("nome");
const dataInizio = document.getElementById("dataInizio");
const dataFine = document.getElementById("dataFine");
const yearToday = new Date().getFullYear();
const yearMin = new Date().setFullYear(1900);

dataInizio.setAttribute("min", 1900);
dataInizio.setAttribute("max", yearToday);
dataInizio.value.addEventListener("onclick", event => {check(event)});
function check(event){
    if (dataInizio.value != ""){
        event.preventDefault();
        dataFine.setAttribute("min", dataInizio.value);
    }
}

dataFine.setAttribute("max", yearToday);

function controllo(){
    if(nome.value == "" || dataInizio.value == "" || dataFine.value == ""){
        alert("CAMPI VUOTI");
        e.preventDefault();
    }
}
