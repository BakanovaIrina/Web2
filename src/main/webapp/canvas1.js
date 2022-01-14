function drawCanvas() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;

    context.fillStyle = "#FFFFFF"

    //Фигуры
    context.beginPath();
    context.fillStyle = "#FFFFFF"
    context.lineWidth = 1;
    context.strokeStyle = "#FFFFFF";
    context.rect(canvas.width/6, canvas.height/2, canvas.width/3 , canvas.height/6);
    context.moveTo(canvas.width/2, canvas.height/2);
    context.arc(canvas.width/2, canvas.height/2, canvas.width/3, 0, Math.PI/2, false);
    context.lineTo(canvas.width/2, canvas.height/3);
    context.lineTo(canvas.width/6, canvas.height/2);
    context.lineTo(canvas.width/2, canvas.height/2);
    context.fill();
    context.stroke();
    context.closePath();

    //Оси
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "#ABABAB";

    context.moveTo(0, canvas.height/2);
    context.lineTo(canvas.width, canvas.height/2);

    context.moveTo(canvas.width/2, canvas.height);
    context.lineTo(canvas.width/2, 0);

    context.moveTo(canvas.width/2, 0);
    context.lineTo(canvas.width/2 - 5,  15);
    context.moveTo(canvas.width/2, 0);
    context.lineTo(canvas.width/2 + 5,  15);

    context.moveTo(canvas.width, canvas.height/2);
    context.lineTo(canvas.width - 15,  canvas.height/2 - 5);
    context.moveTo(canvas.width, canvas.height/2);
    context.lineTo(canvas.width - 15,  canvas.height/2 + 5);
    context.stroke();
    context.closePath();

    //Текст
    context.fillStyle = "#000000";
    context.font='10pt Arial'
    context.fillText("Y", canvas.width/2 + 5, 10);
    context.fillText("R", canvas.width/2 + 5, canvas.height/6);
    context.fillText("R/2", canvas.width/2 + 5, canvas.height/3);
    context.fillText("-R/2", canvas.width/2 + 5, canvas.height*2/3);
    context.fillText("-R", canvas.width/2 + 5, canvas.height*5/6);

    context.fillText("X", canvas.width - 10, canvas.height/2 - 5);
    context.fillText("R", canvas.width*5/6, canvas.height/2 - 5);
    context.fillText("R/2", canvas.width*2/3, canvas.height/2 - 5);
    context.fillText("-R/2", canvas.width/3, canvas.height/2 - 5);
    context.fillText("-R", canvas.width/6, canvas.height/2 - 5);



    //отмеченные точки на горизонтальной прямой
    context.beginPath();
    context.moveTo(canvas.width/2 - 3, canvas.height/6);
    context.lineTo(canvas.width/2 + 3, canvas.height/6);
    context.moveTo(canvas.width/2 - 3, canvas.height/3);
    context.lineTo(canvas.width/2 + 3, canvas.height/3);
    context.moveTo(canvas.width/2 - 3, canvas.height*2/3);
    context.lineTo(canvas.width/2 + 3, canvas.height*2/3);
    context.moveTo(canvas.width/2 - 3, canvas.height*5/6);
    context.lineTo(canvas.width/2 + 3, canvas.height*5/6);

    context.moveTo(canvas.width*5/6, canvas.height/2 - 3);
    context.lineTo(canvas.width*5/6, canvas.height/2 + 3);
    context.moveTo(canvas.width*2/3, canvas.height/2 - 3);
    context.lineTo(canvas.width*2/3, canvas.height/2 + 3);
    context.moveTo(canvas.width/3, canvas.height/2 - 3);
    context.lineTo(canvas.width/3, canvas.height/2 + 3);
    context.moveTo(canvas.width/6, canvas.height/2 - 3);
    context.lineTo(canvas.width/6, canvas.height/2 + 3);
    context.stroke();
    drawPoints();

}

function drawPoints() {
    let Xs = Array.from(document.getElementsByClassName("the_X")).map(v => v.innerHTML);
    let Ys = Array.from(document.getElementsByClassName("the_Y")).map(v => v.innerHTML);
    let Rs = Array.from(document.getElementsByClassName("the_R")).map(v => v.innerHTML);
    let Results = Array.from(document.getElementsByClassName("the_Result")).map(v => v.innerHTML);
    for (let i = 0; i < Xs.length; i++) {
        drawRawPoint(Xs[i], Ys[i], Rs[i], Results[i])
    }
}

function drawPoint(x, y, result) {
    let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d");
    context.strokeStyle = "#ABABAB";
    if (result.toString().trim() === 'false') {
        context.fillStyle = "#FFA488";
    } else {
        context.fillStyle = "#99FF99";
    }
    context.beginPath();
    context.arc(x, y, 7, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
}


function drawRawPoint(x, y, r, res) {
    drawPoint(x / r * 100 + 150, y / -r * 100 + 150, res);
}

function handleCanvasClick(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top

    r_value = getR();
    if(!checkR(r)){
        return;
    }

    let x_value = ((clickX - 150) * r_value/ 100);
    let y_value = ((-1) * (clickY - 150) * r_value/ 100);
    sendRequest(x_value, y_value, r_value);
}