window.addEventListener("load", function() {
    setTimer();
});

let timer = null;

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