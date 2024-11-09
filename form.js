const createForm = (parentElement) => {
    let data = {};
    let callback = null;

    return {
        setLabels: (labels) => { data = labels; }, 
        onsubmit: (callbackInput) => { callback = callbackInput; },
        render: () => {
            parentElement.innerHTML = 
                <div>Luogo<br/><input id="luogo" type="input" class="form-label form-control"/></div> +
                <button type='button' id='submit' class="btn btn-primary">Conferma</button>;

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