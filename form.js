//import { addMarkerToMap } from './main.js'; // Importiamo addMarkerToMap

const createForm = (parentElement) => {
    let data = {};
    let callback = null;

    return {
        setLabels: (labels) => { data = labels; }, 
        onsubmit: (callbackInput) => { callback = callbackInput; },
        render: () => {
            parentElement.innerHTML = 
                `<div>Luogo<br/><input id="luogo" type="input" class="form-label form-control"/></div>` +
                `<button type='button' id='submit' class="btn btn-primary">Conferma</button>`;

            document.querySelector("#submit").onclick = () => {
                const result = {
                    luogo: document.querySelector("#luogo").value,
                };
                callback(result);  
            };
        }
    };
};

const formElement = document.getElementById("form");
const form = createForm(formElement);

form.onsubmit((resultform) => {  
    const template = "https://us1.locationiq.com/v1/search?key=pk.4c152dca3f2bafd2bc569da91faf2567&q=%LUOGO&format=json&";  
    let url=template.replace("%LUOGO",resultform.luogo)  
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const coords = [data[0].lat,data[0].lon];
            const posto=[data[0].display_name]
            addMarkerToMap(coords, posto);
            })
    console.log(resultform.luogo);
    document.querySelector("#luogo").value = "";
});

form.render();
