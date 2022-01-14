let x, y, r
let x_value, y_value, r_value;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send").addEventListener("click", send)
    const canvas = document.querySelector('canvas')
    canvas.addEventListener('click', function (e) {
        handleCanvasClick(canvas, e)
    })
});

function send(){
    x = document.getElementById("X_select");
    x_value = document.getElementById("X_select").value.substring(0, 12);
    y = document.querySelector("input[id=Y_text]");
    y_value = document.querySelector("input[id=Y_text]").value.replace(",", ".").substring(0, 12);
    r_value = getR();
    if(validateX(x_value) && validateY(y_value) && checkR(r)){
        sendRequest(x_value, y_value, r_value);
    }
}

function sendRequest(x, y, r){
        fetch('check', {
            method: 'POST',
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"
            },
            body: "x=" + x + "&y=" + y + "&r=" + r
        }).then(function () {
                location.reload();
            });
}

function getR(){
    r = document.getElementsByName("R_radio");
    let r_checked = false;
    for (let r_radio of r) {
        if (r_radio.checked){
            r_value = r_radio.value;
            r_checked = true
            break
        }
    }
    if(r_checked){
        return r_value;
    }
}

function checkR(r_radio){
    r_value = getR(r_radio);
    if(!r_value){
        openErrorMessage("Значение R не выбрано");
        return false;
    }
    else if (validateR(r_value)){
        return true;
    }
}

function validateX(x_value) {
    if (!isNumeric(x_value) ){
        openErrorMessage("X не является числом");
        return false;
    }
    if(x_value > 5 || x_value < -3){
        openErrorMessage("X не удовлетворяет промежутку!");
        return false
    }
    return true;
}

function validateY(y_value){
    if(y_value === ""){
        openErrorMessage("Y не введён");
        return false;
    }
    else if (!isNumeric(y_value)){
        openErrorMessage("Y не является числом")
        return false;
    } else if((y_value >= 3) || (y_value <= -3)){
        openErrorMessage("Y не подходит");
        return false;
    }
    return true;
}

function validateR(r_value) {
    if (r_value < 1 || r_value > 3) {
        openErrorMessage("R не подходит");
        return false;
    }
    return true;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function openErrorMessage(msg){
    let err = document.getElementById("error_message")
    err.innerText = msg
    err.hidden = false
    setTimeout(() => {
        err.hidden = true
    }, 3000)
}