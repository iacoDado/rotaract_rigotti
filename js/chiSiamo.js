
//Creo la linea del tempo dinamicamente
creaLineaTempo();

//TODO: rifare gestione errori per tutto

async function creaLineaTempo() {
    //Carico la lista dei presidenti; la funzione è asincrona e devo aspettarla, quindi uso l'await per farlo;
    //per poterlo usare la funzione in cui è contenuto deve essere asincrona
    var jsonPresidenti = await caricaPresidenti();

    //Calcolo dopo quante caselle (oltre alla prima) della prima riga dovrò iniziare a inserire i presidenti,
    //in modo che l'anno del mandato corrisponda a quello della casella
    var offsetStart = parseInt(jsonPresidenti.presidenti[0].mandato.split("-")[0].trim())%10;

    //Determino il numero di righe di cui ho bisogno
    var nRigheColonna = Math.floor((jsonPresidenti.presidenti.length+offsetStart)/10);
    if ((jsonPresidenti.presidenti.length+offsetStart)%10 != 0) {
        nRigheColonna ++;
    }

    costruisciLineaTempo(nRigheColonna, offsetStart, jsonPresidenti.presidenti);
}

function costruisciLineaTempo(nRighe, offStart, listaPresidenti) {
    //Creo la tabella che uso come linea del tempo
    var aDiv = costruisciTabella(parseInt(listaPresidenti[0].mandato.split("-")[0]), nRighe, 11, "tabTempo");

    var offsetDiv = 0;
    var ctr = offStart + 1;
    //Ciclo la lista dei presidenti e li inserisco uno a uno
    listaPresidenti.forEach(presidente => {
        //Ogni casella contiene un div, quindi dire div o dire casella è la stessa cosa

        //Se il presidente che considero andrebbe inserito nella prima casella di una riga non lo faccio;
        //lascio il div della casella vuoto e senza classi e passo alla prossima casella
        if (ctr%11==0) {
            aDiv[ctr].className = "";
            ctr ++;
        }
        
        //Variabile per il div della casella che sto considerando
        var div;
        
        //Determino l'anno di inizio mandato
        var anno = parseInt(presidente.mandato.split("-")[0]);
        //Variabile per l'anno di fine mandato
        var annod;
        //Guardo se il decennio è dispari
        if (Math.floor(parseInt(anno/10))%2==1) {
            //Se il decennio è dispari i presidenti andranno inseriti nella riga da destra a sinistra

            //Determino il div, partendo da destra e andando in ogni ciclo di uno a sinistra
            //(ctr + 9 per prenderlo quello più a destra, poi aumento di 2 l'offsetdiv e di 1 il ctr;
            //così facendo ad ogni ciclo prenderò un div di 1 più a sinistra del ciclo precedente)
            div = aDiv[ctr + 9 - offsetDiv];

            //Mi calcolo gli anni di inizio e fine mandato in formato 'AA
            anno = (anno )%100;
            annod = (anno+1)%100;
            //Se risultano corti ('1, '2, '3, '4, '5, '6, '7, '8, '9, '0) concateno uno zero prima
            //per una questione di uniformità di formato
            if (annod.toString().length<2) {
                annod="0"+annod
            }
            if (anno.toString().length<2) {
                anno="0"+anno
            }
            
            //Assegno come attributo del div il nome del presidente, così facendo riesco a recuperarlo facilmente
            //per mostrarlo quando ci si passa sopra col mouse
            div.setAttribute("data-nome", presidente.nome);
            //Inserisco nel div gli anni di mandato
            div.innerHTML = "'" + anno + "-" + "'" +  annod;
            //Assegno alla casella un attributo con l'anno, così da farlo mostrare dalla pseudo classe ::before nel css
            div.parentElement.setAttribute("data-anno", "'" + anno + "-" + "'" +  annod);

            //Aumento la variabile di selezione del dei div
            offsetDiv += 2;
        } else {
            //Se il decennio è pari i presidenti andranno inseriti nella riga da sinistra a destra
            
            //Inizializzo l'offsetdiv a 0 per la prossima riga di decennio dispari
            offsetDiv = 0;
            
            //Determino il div in cui inserirò i dati del presidente
            div = aDiv[ctr];

            //Determino gli anni nel formato 'AA
            anno = anno%100
            annod = (anno+1)%100;
            //Controllo sull'uniformità del formato
            if (annod.toString().length<2) {
                annod="0"+annod
            }
            if (anno.toString().length<2) {
                anno="0"+anno
            }
            
            //Assegno all'attributo il nome del presidente per la visualizzazione
            div.setAttribute("data-nome", presidente.nome);
            //Visualizzo l'anno
            div.innerHTML = "'" + anno + "-" + "'" +  annod;
            //Assegno all'attributo della casella l'anno per permetterne la visualizzazione
            div.parentElement.setAttribute("data-anno", "'" + anno + "-" + "'" +  annod);
        }

        //A ogni div aggiungo gli eventlistener per gestire la visualizzazione del presidente
        div.addEventListener("mouseenter", handleMouseEnter);
        div.addEventListener("mouseleave", handleMouseLeave);
        
        //Aumento il contatore di selezione dei div
        ctr ++;
    });   
}

function costruisciTabella(annoIniziale, nR, nC, id) {
    var t = document.getElementById(id);
    var divList = new Array(0);
    var decennio = Math.floor(annoIniziale/10);

    for (var i = 0; i < nR; i++) {
        var r = document.createElement("tr");
        r.id = "riga" + decennio + "0";
        r.className = "rigaTempo";

        for (var j = 0; j < nC; j++) {
            var c = document.createElement("td");
            var d = document.createElement("div");

            d.className = "divAnno";

            divList.push(d);
            c.appendChild(d);
            r.appendChild(c);
        }
        t.appendChild(r);
        decennio ++;
    }

    return divList;
}

//Funziona solo con un modello client-server, quindi per far si che funzioni in locale devo usare live server
async function caricaPresidenti() {
    const response = await fetch("../src/presidenti.json");
    const testoJson = await response.json();
    return testoJson;
}

function handleMouseEnter() {
    var casella = this.parentElement;

    // Evita duplicati se il mouse entra ed esce rapidamente
    if (casella.querySelector('.info-pres-hover')) {
        return; 
    }

    const infoPres = document.createElement('p');
    infoPres.className = 'info-pres-hover'; 
    
    infoPres.innerText = this.getAttribute("data-nome");

    const br = document.createElement('br');
    br.className = 'info-pres-hover';

    casella.appendChild(br);
    casella.appendChild(infoPres);
}

function handleMouseLeave() {
    var casella = this.parentElement;
    const elementiTemporanei = casella.querySelectorAll('.info-pres-hover');

    elementiTemporanei.forEach(el => {
        if (el && el.parentElement === casella) {
            casella.removeChild(el);
        }
    });
}