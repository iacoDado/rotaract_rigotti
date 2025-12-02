const FORM = document.getElementById("formPresidente");

FORM.addEventListener("submit", e => {controllo(e)});
const nome = document.getElementById("nome");
const dataInizio = document.getElementById("dataInizio");
const dataFine = document.getElementById("dataFine");
const yearToday = new Date().getFullYear();
const yearMinAbsolute = 1900;

dataInizio.setAttribute("min", yearMinAbsolute);
dataInizio.setAttribute("max", yearToday);
dataFine.setAttribute("max", yearToday + 1);


function controllo(){
    if(nome.value == "" || dataInizio.value == "" || dataFine.value == ""){
        alert("CAMPI VUOTI");
        //e.preventDefault();
    }
}


function aggiornaDataFineMinimo() {
    const annoNascita = parseInt(dataInizio.value);

    // Controlla che l'input non sia vuoto e sia un numero valido
    if (!isNaN(annoNascita) && annoNascita >= yearMinAbsolute && annoNascita <= yearToday) {

        dataFine.setAttribute("min", annoNascita);
        const annoMorte = parseInt(dataFine.value);


        if (!isNaN(annoMorte) && annoMorte < annoNascita) {
            dataFine.value = annoNascita;
        }
    } else {
        dataFine.removeAttribute("min");
    }
}


dataInizio.addEventListener("input", aggiornaDataFineMinimo);