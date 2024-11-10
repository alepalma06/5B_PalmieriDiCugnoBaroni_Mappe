import { add } from './mappa.js'; // Importiamo add

const createForm = (parentElement) => {
    let data = {};
    let callback = null;

    return {
        setLabels: (labels) => { data = labels; }, 
        onsubmit: (callbackInput) => { callback = callbackInput; },
        render: () => {
            //creazione form
            parentElement.innerHTML = 
                `<div>Luogo<br/><input id="luogo" type="input" class="form-label form-control"/></div>` +
                `<button type='button' id='submit' class="btn btn-primary">Conferma</button>`;
            //creazione di result
            document.querySelector("#submit").onclick = () => {
                const result = {
                    luogo: document.querySelector("#luogo").value,
                };
                callback(result);  
            };
        }
    };
};

//inizializzazione form
const formElement = document.getElementById("form");
const form = createForm(formElement);
//pressione bottone form
form.onsubmit((resultform) => {  
    const template = "https://us1.locationiq.com/v1/search?key=pk.4c152dca3f2bafd2bc569da91faf2567&q=%LUOGO&format=json&"; 
    //replace %luogo con input della form 
    let url=template.replace("%LUOGO",resultform.luogo)  
    fetch(url)
        .then(response => response.json())
        .then(data => {
            //creazione di coord
            const coords = [data[0].lat,data[0].lon];
            const posto=[data[0].display_name]
            //chiamo la funzione add 
            add(coords, posto);
            })
    console.log(resultform.luogo);
    document.querySelector("#luogo").value = "";
});

form.render();
