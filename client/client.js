const handleResponse = (xhr, parseResponse) => {
    const content = document.querySelector('#submitFeedback');
    const display = document.querySelector('#display');
    const xpDisplay = document.querySelector('#CROut');

    switch (xhr.status) {
        case 200:
            const obj = JSON.parse(xhr.response);
            //display.innerHTML = '<b>Success</b>';
            if(obj.users)
            {
                displayData(obj.users, display);
            } else if(obj.xp)
            {
                displayXP(obj, xpDisplay);
            }
            
            break;
        case 201:
            content.innerHTML = '<b>Created</b>';
            break;
        case 204:
            content.innerHTML = '<b>Updated (No Content)!</b>';
            break;
        case 400:
            content.innerHTML = '<b>Bad Request</b>';
            break;
        case 404:
            content.innerHTML = '<b>Not Found</b>';
            break;
        default:
            content.innerHTML = '<b>Error Code Not Implemented</b>';
            break;
    }

    //if (parseResponse) {
    //    const obj = JSON.parse(xhr.response);
    //
    //    display.innerHTML += `<p>${xhr.response}</p>`;
    //} else {
    //    content.innerHTML += `<p>Metadata Recieved</p>`;
    //}
};

const displayData = (obj, display) => {
    display.innerHTML = "";

    Object.keys(obj).forEach(key => {
        display.innerHTML +=
        `<div class='displayBlock'>
        <p>Character Name: ${obj[key].name}</p>
        <p>Level: ${obj[key].lvl}</p>
        </div>`
    });
}

const displayXP = (obj, xpDisplay) => {
    xpDisplay.innerHTML = `Encounter XP: ${obj.xp}`;
}

const requestUpdate = (e) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/getUsers');

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => handleResponse(xhr, true);

    xhr.send();

    if(e)
    {
        e.preventDefault();
    }
    
    return false;
};

const getCR = (e, form) => {
    const xhr = new XMLHttpRequest();
    url = form.querySelector('#diffField').value;
    xhr.open('get', url);
    
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => handleResponse(xhr, true);

    xhr.send();
    
    e.preventDefault();
    return false;
}

const sendPost = (e, charForm) => {
    e.preventDefault();

    const nameAction = charForm.getAttribute('action');
    const nameMethod = charForm.getAttribute('method');

    const nameField = charForm.querySelector('#nameField');
    const lvlField = charForm.querySelector('#lvlField');

    const xhr = new XMLHttpRequest();
    xhr.open(nameMethod, nameAction);

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = () => handleResponse(xhr);

    const formData = `name=${nameField.value}&lvl=${lvlField.value}`;
    xhr.send(formData);

    requestUpdate(e);

    return false;
};

const init = () => {
    const charForm = document.querySelector('#charForm');
    const addUser = (e) => sendPost(e, charForm);
    charForm.addEventListener('submit', addUser);

    const CRForm = document.querySelector('#calcForm');
    const calcCR = (e) => getCR(e, CRForm);
    CRForm.addEventListener('submit', calcCR);

    requestUpdate();

    //const userForm = document.querySelector('#userForm');

    //const getUsers = (e) => requestUpdate(e, userForm);

    //userForm.addEventListener('submit', getUsers);
};

window.onload = init;