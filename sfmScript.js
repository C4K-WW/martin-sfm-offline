function send(nickname, input) {
    let time = new Date();
    let element = document.createElement("div");
    let text = document.createTextNode(`${input.value}`);
    let nick = document.createTextNode(
        `${time.getHours()}:${time.getMinutes()}:
        ${time.getSeconds()} ${nickname.value}: `);
    element.appendChild(nick);
    element.appendChild(text);

    let content = document.querySelector(".chat-message");
    content.appendChild(element);
}

const textField = document.querySelector(".chat-textarea");

function clear() {
    textField.value = " ";
}

form.addEventListener("submit", (event) => {
    //event.preventDefault();
    // send(nickname, input);
    // clear();
});

window.addEventListener("load", function() {
    setTimer();
});

function setTimer() {
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(function() {
        window.location.reload();
    }, 10000);
}

function onKeyDown() {
    setTimer();
}