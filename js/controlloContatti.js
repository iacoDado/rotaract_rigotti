const FORM = document.getElementById("formBtn");

const regexNome = new RegExp("[a-zA-Z0-9.]+");
const regexEmail = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}");

FORM.addEventListener("click", e => {controllo(e)});

function controllo (e){
    let nome = document.getElementById("nome_mittente").value;
    let mail = document.getElementById("email_mittente").value;

    if(nome != "" && mail != ""){
        if(!regexEmail.test(nome) && !regexEmail.test(mail)){
            e.preventDefault();
            alert("Errore nella compilazione dei campi");
        }
    }else{
        e.preventDefault();
        alert("Campi vuoti");
    }

    if(!document.getElementById("accetto").checked){
        e.preventDefault();
        alert("Senza accettare l'informativa non si può mandare l'email");
    }

}


