function send(nickname, input) {
    var time = new Date();
    var element = document.createElement("div");
    var text = document.createTextNode(`${input.value}`);
    var nick = document.createTextNode(
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${
      nickname.value
    }: `
    );
    element.appendChild(nick);
    element.appendChild(text);

    var content = document.querySelector(".chat-message");
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

// window.addEventListener("load", function() {
//     setTimer();
// });

// function setTimer() {
//     if (timer) {
//         clearTimeout(timer);
//     }

//     timer = setTimeout(function() {
//         window.location.reload();
//     }, 10000);
// }

// function onKeyDown() {
//     setTimer();
// }

// function send(inputnick, input) {#d