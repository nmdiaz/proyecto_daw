let tamaño = 4;
let min = 0;
let max = tamaño - 1;

let movido = false;
let score = 0;
let body = document.getElementsByTagName("body")[0];
let boton = document.createElement("button");
let center = document.getElementsByTagName("center")[0];

boton.id = "ngame";
boton.innerHTML = "Nueva partida"
center.appendChild(boton);

//Iniciar la partida
cargar();
let exIds = [];
function cargar() {
    //Carga del juego

    //Cargar el tablero
    let html = '<table border="1">';
    for (let fila = 0; fila < tamaño; fila++) {
        html += '<tr>';
        for (let col = 0; col < tamaño; col++) {
            let id = fila + "" + col;
            html += '<td align="center" valign="center" height="100" width="100" id="' + id + '"></td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById("tablero").innerHTML = html;
    let id1 = getId();
    let id2 = "";
    while (true) {
        id2 = getId();
        if (id1 != id2)
            break;
    }
    //Valores iniciales
    document.getElementById(id1).innerHTML = "2";
    document.getElementById(id2).innerHTML = "2";
    document.getElementById(id1).style.backgroundColor = getColor(2);
    document.getElementById(id2).style.backgroundColor = getColor(2);

    score = 0;
    document.getElementById("score").innerHTML = score;
    return false;
}
function random() {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getId() {
    let i = random();
    let j = random();
    return i + "" + j;
}
function mvArriba() { };
function mvIzq() { };
function mvderecha() { };
function mvabajo() { };


function arriba() {
    movido = false;
    exIds = [];
    for (let j = min; j <= max; j++) {
        for (let i = min; i <= max; i++) {
            let id = i + "" + j;
            if (document.getElementById(id).innerHTML != "") {
                mvArriba(id);
            }
        }
    }
    if (movido == true) {
        actualizar();
    }
    return false;
}

function izquierda() {
    movido = false;
    exIds = [];
    for (let i = min; i <= max; i++) {
        for (let j = min; j <= max; j++) {
            let id = i + "" + j;
            if (document.getElementById(id).innerHTML != "") {
                mvIzq(id);
            }
        }
    }
    if (movido == true) {
        actualizar();
    }
    return false;
}

function abajo() {
    movido = false;
    exIds = [];
    for (let i = min; i <= max; i++) {
        for (let j = max; j >= min; j--) {
            let id = j + "" + i;
            if (document.getElementById(id).innerHTML != "") {
                mvabajo(id);
            }
        }
    }
    if (movido == true) {
        actualizar();
    }
    return false;
}

function derecha() {
    movido = false;
    exIds = [];
    for (let i = min; i <= max; i++) {
        for (let j = max; j >= min; j--) {
            let id = i + "" + j;
            if (document.getElementById(id).innerHTML != "") {
                mvderecha(id);
            }
        }
    }
    if (movido == true) {
        actualizar();
    }
    return false;
}

function actualizar() {
    //Añadir un nuevo valor
    let ids = [];
    for (let i = min; i <= max; i++) {
        for (let j = min; j <= max; j++) {
            let id = i + "" + j;
            if (document.getElementById(id).innerHTML == "") {
                ids.push(id);
            }
        }
    }
    let id = ids[Math.floor(Math.random() * ids.length)];
    document.getElementById(id).innerHTML = "2";
    document.getElementById(id).style.backgroundColor = getColor(2);
    //Verificar si hay espacio disponible para mover
    let ocupado = true;
    for (let i = min; i <= max; i++) {
        for (let j = min; j <= max; j++) {
            let id = i + "" + j;
            if (document.getElementById(id).innerHTML == "") {
                ocupado = false;
                break;
            }
        }
    }
    //Actualizar score
    document.getElementById("score").innerHTML = score;
    if (ocupado) {
        checkGameOver();
    }
}

function getColor(val) {
    let color = "#ffffff";
    switch (val) {
        case 2: color = "pink"; break;
        case 4: color = "#FFA07A"; break;
        case 8: color = "#F0E68C"; break;
        case 16: color = "#82E0AA"; break;
        case 32: color = "#AED6F1"; break;
        case 64: color = "#58D3F7"; break;
        case 128: color = "#FA58F4"; break;
        case 256: color = "#A901DB"; break;
        case 512: color = "#01DF3A"; break;
        case 1024: color = "#D7DF01"; break;
        case 2048: color = "#DC7633"; break;
        default: color = "#ffffff";
    }
    return color;
}

document.addEventListener("keydown", function (e) {

    switch (e.keyCode) {
        case 65:
            izquierda();
            break;
        case 37:
            izquierda();
            break;
        case 87:
            arriba();
            break;
        case 38:
            arriba();
            break;
        case 68:
            derecha();
            break;
        case 39:
            derecha();
            break;
        case 83:
            abajo();
            break;
        case 40:
            abajo();
            break;
    }
}, true);

document.getElementById("ngame").addEventListener("click", cargar, true);