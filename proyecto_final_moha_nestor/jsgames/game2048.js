(function () {
    //Tamaño del tablero
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
        document.getElementById(id1).style.backgroundImage = getImage(2);
        document.getElementById(id2).style.backgroundImage = getImage(2);

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
    function mvArriba(id) {
        if (!id.startsWith(min)) {
            let arr = id.split("");
            let i = parseInt(arr[0]);
            let j = parseInt(arr[1]);
            for (let k = (i - 1) ; k >= min; k--) {
                let nId = k + "" + j;
                if (document.getElementById(nId).innerHTML != "") {
                    let val = parseInt(document.getElementById((k + 1) + "" + j).innerHTML);
                    let nVal = parseInt(document.getElementById(nId).innerHTML);
                    if (val == nVal) {
                        if (exIds.indexOf(nId) == -1) {
                            exIds.push(nId);
                            document.getElementById(nId).innerHTML = (val + nVal);
                            document.getElementById(nId).style.backgroundImage = getImage((val + nVal));
                            document.getElementById((k + 1) + "" + j).innerHTML = "";
                            document.getElementById((k + 1) + "" + j).style.backgroundImage = "none";
                            movido = true;
                            score += (val + nVal);
                        }
                        break;
                    }
                }
                else {
                    document.getElementById(nId).innerHTML = document.getElementById((k + 1) + "" + j).innerHTML;
                    document.getElementById(nId).style.backgroundImage = document.getElementById((k + 1) + "" + j).style.backgroundImage;
                    document.getElementById((k + 1) + "" + j).innerHTML = "";
                    document.getElementById((k + 1) + "" + j).style.backgroundImage = 'none';
                    movido = true;
                }
            }
        }
        return false;
    };
    function mvIzq(id) {
        if (!id.endsWith(min)) {
            let arr = id.split("");
            let i = parseInt(arr[0]);
            let j = parseInt(arr[1]);
            for (let k = (j - 1) ; k >= min; k--) {
                let nId = i + "" + k;
                if (document.getElementById(nId).innerHTML != "") {
                    let val = parseInt(document.getElementById(i + "" + (k + 1)).innerHTML);
                    let nVal = parseInt(document.getElementById(nId).innerHTML);
                    if (val == nVal) {
                        if (exIds.indexOf(nId) == -1) {
                            exIds.push(nId);
                            document.getElementById(nId).innerHTML = (val + nVal);
                            document.getElementById(nId).style.backgroundImage = getImage((val + nVal));
                            document.getElementById(i + "" + (k + 1)).innerHTML = "";
                            document.getElementById(i + "" + (k + 1)).style.backgroundImage = "none";
                            movido = true;
                            score += (val + nVal);
                        }
                        break;
                    }
                }
                else {
                    document.getElementById(nId).innerHTML = document.getElementById(i + "" + (k + 1)).innerHTML;
                    document.getElementById(nId).style.backgroundImage = document.getElementById(i + "" + (k + 1)).style.backgroundImage;
                    document.getElementById(i + "" + (k + 1)).innerHTML = "";
                    document.getElementById(i + "" + (k + 1)).style.backgroundImage = 'none';
                    movido = true;
                }
            }
        }
        return false;
    }
    function mvderecha(id) {
        if (!id.endsWith(max)) {
            let arr = id.split("");
            let i = parseInt(arr[0]);
            let j = parseInt(arr[1]);
            for (let k = (j + 1) ; k <= max; k++) {
                let nId = i + "" + k;
                if (document.getElementById(nId).innerHTML != "") {
                    let val = parseInt(document.getElementById(i + "" + (k - 1)).innerHTML);
                    let nVal = parseInt(document.getElementById(nId).innerHTML);
                    if (val == nVal) {
                        if (exIds.indexOf(nId) == -1) {
                            exIds.push(nId);
                            document.getElementById(nId).innerHTML = (val + nVal);
                            document.getElementById(nId).style.backgroundImage = getImage((val + nVal));
                            document.getElementById(i + "" + (k - 1)).innerHTML = "";
                            document.getElementById(i + "" + (k - 1)).style.backgroundImage = "none";
                            movido = true;
                            score += (val + nVal);
                        }
                        break;
                    }
                }
                else {
                    document.getElementById(nId).innerHTML = document.getElementById(i + "" + (k - 1)).innerHTML;
                    document.getElementById(nId).style.backgroundImage = document.getElementById(i + "" + (k - 1)).style.backgroundImage;
                    document.getElementById(i + "" + (k - 1)).innerHTML = "";
                    document.getElementById(i + "" + (k - 1)).style.backgroundImage = 'none';
                    movido = true;
                }
            }
        }
        return false;
    }
    function mvabajo(id) {
        if (!id.startsWith(max)) {
            let arr = id.split("");
            let i = parseInt(arr[0]);
            let j = parseInt(arr[1]);
            for (let k = (i + 1) ; k <= max; k++) {
                let nId = k + "" + j;
                if (document.getElementById(nId).innerHTML != "") {
                    let val = parseInt(document.getElementById((k - 1) + "" + j).innerHTML);
                    let nVal = parseInt(document.getElementById(nId).innerHTML);
                    if (val == nVal) {
                        if (exIds.indexOf(nId) == -1) {
                            exIds.push(nId);
                            document.getElementById(nId).innerHTML = (val + nVal);
                            document.getElementById(nId).style.backgroundImage = getImage((val + nVal));
                            document.getElementById((k - 1) + "" + j).innerHTML = "";
                            document.getElementById((k - 1) + "" + j).style.backgroundImage = "#ffffff";
                            movido = true;
                            score += (val + nVal);
                        }
                        break;
                    }
                }
                else {
                    document.getElementById(nId).innerHTML = document.getElementById((k - 1) + "" + j).innerHTML;
                    document.getElementById(nId).style.backgroundImage = document.getElementById((k - 1) + "" + j).style.backgroundImage;
                    document.getElementById((k - 1) + "" + j).innerHTML = "";
                    document.getElementById((k - 1) + "" + j).style.backgroundImage = 'none';
                    movido = true;
                }
            }
        }
        return false;
    }


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
        document.getElementById(id).style.backgroundImage = getImage(2);
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
    function checkGameOver() {
        let gameover = true;
        for (let j = min; j <= max; j++) {
            for (let i = min; i <= (max - 1) ; i++) {
                let val = parseInt(document.getElementById(i + "" + j).innerHTML);
                let nVal = parseInt(document.getElementById((i + 1) + "" + j).innerHTML);
                if (val == nVal) {
                    gameover = false;
                    break;
                }
            }
        }
        if (gameover == true) {
            for (let i = min; i <= max; i++) {
                for (let j = min; j <= (max - 1) ; j++) {
                    let val = parseInt(document.getElementById(i + "" + j).innerHTML);
                    let nVal = parseInt(document.getElementById(i + "" + (j + 1)).innerHTML);
                    if (val == nVal) {
                        gameover = false;
                        break;
                    }
                }
            }
        }
        if (gameover) {
            alert("Game over!");
        }
        return false;
    }

    function getImage(val) {
        let img = "#ffffff";
        switch (val) {
            case 2: img = "url('../content/images/2.jpg')"; break;
            case 4: img = "url('../content/images/4.jpg')"; break;
            case 8: img = "url('../content/images/8.jpg')"; break;
            case 16: img = "url('../content/images/16.jpg')"; break;
            case 32: img = "url('../content/images/32.jpg')"; break;
            case 64: img = "url('../content/images/64.jpg')"; break;
            case 128: img = "url('../content/images/128.jpg')"; break;
            case 256: img = "url('../content/images/256.jpg')"; break;
            case 512: img = "url('../content/images/512.jpg')"; break;
            case 1024: img = "url('../content/images/1024.jpg')"; break;
            case 2048: img = "url('../content/images/2048.jpg')"; break;
            default: img = 'none';
        }
        return img;
    }

    document.addEventListener("keydown", function (e) {

        switch (e.keyCode) {
            case 65:
                izquierda();
                randomColor();
                break;
            case 37:
                izquierda();
                randomColor();
                break;
            case 87:
                arriba();
                randomColor();
                break;
            case 38:
                arriba();
                randomColor();
                break;
            case 68:
                derecha();
                randomColor();
                break;
            case 39:
                derecha();
                randomColor();
                break;
            case 83:
                abajo();
                randomColor();
                break;
            case 40:
                abajo();
                randomColor();
                break;
        }
    }, true);

    let scor = document.getElementById('scor').style.color = "white";
    document.getElementById("ngame").addEventListener("click", cargar, true);
    document.getElementsByClassName('body-content')[0].style.backgroundImage = "url(../content/images/fondo2.gif";

    function randomColor() {
        let tcolor = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
              '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
              '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
              '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
              '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
              '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
              '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
              '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
              '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
              '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
        let rcolor = document.getElementsByTagName('tbody')[0]
        rcolor.style.borderColor = tcolor[Math.floor(Math.random() * (tcolor.length + 1))];
        return rcolor;
    }

})();