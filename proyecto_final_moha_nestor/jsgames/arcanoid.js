(function () {
    "use strict";
    /*variables globales*/
    let bolalanzada = false;
    let recargabola;
    let bajarpower = 0;
    let muriendo = 0;
    let puntuacion = 0;
    /*fin variables globales*/

    let cuerpo = document.getElementsByTagName('body')[0];
    cuerpo.addEventListener('keydown', pulsar, false);
    cuerpo.addEventListener('keyup', soltar, false);
    let teclas = [];
    let nivelactual = 0;

    let niveles = crearniveles();
    iniciar();
    
    function cargarNivel()
    {  	
    	agregarjugador();
    	agregarniveles(niveles[nivelactual]);
    	agregarbolainicio();
    	rellenarbloquesetiquetas();
    }


	//inicio juego
	//cargar primer nivel
    cargarNivel();
    function iniciar() {
        let intervalo = setInterval(juego, 1000 / 60);
    }


    //intervalos de juego
    function juego() {
        if (muriendo == 0) moverse();
        /*Primer saque*/
        recolocarfichas();
        if (!bolalanzada) movimientoantesdelanzar();
        if (bolalanzada) {
            moverbolas();
            choquebolapared();
            choquebolajug();
            choquebloques();
            if (bajarpower % 3 == 0) {
            	bajarpowerup();
            	if(muriendo == 0) cogerpowerup();
            }
            bajarpower++;
            comprobarNivelFinalizado();
        }
    }


    //moverse
    function moverse() {
        let jugador = document.getElementById('jugador');
        let tablero = document.getElementById('tablero');
        let posicion = jugador.offsetLeft - tablero.offsetLeft;

        if (teclas["a"] || teclas["ArrowLeft"]) {
            if (fueraderecha(jugador, tablero)) {
                posicion = posicion - 8;
                posicion = posicion + "px";
                jugador.style.left = posicion;
            }
        }

        if (teclas["d"] || teclas["ArrowRight"]) {
            if (fueraizquierda(jugador, tablero)) {
                posicion = posicion + 8;
                posicion = posicion + "px";
                jugador.style.left = posicion;
            }

        }
    }

    //calculo salidaderecha
    function fueraderecha(jug, tab) {
        if (jug.offsetLeft > (tab.offsetLeft + 20)) {
            return true;
        }
        else return false;
    }
    //calculo salidaizquierda
    function fueraizquierda(jug, tab) {
        if ((jug.offsetLeft + jug.offsetWidth) < (tab.offsetLeft + tab.offsetWidth - 20)) {
            return true;
        }
        else return false;
    }


    //Pulsaciones
    function pulsar(ev) {
    	ev.preventDefault();
        teclas[ev.key] = true;

    }
    function soltar(ev) {
    	ev.preventDefault();
        teclas[ev.key] = false;
        /*Saque inicial*/
        if ((ev.keyCode == 32) && (!bolalanzada)) sacar();

    }

    //agregar jugador
    function agregarjugador() {
        let jugador = document.createElement('div');
        jugador.id = 'jugador';
        jugador.style.height = '22px';
        jugador.style.width = '88px';
        jugador.style.backgroundImage = "url('../../resources/jug1.png')";
        jugador.style.position = "relative";
        jugador.style.top = "595px";
        jugador.style.left = "251px";
        document.getElementById('tablero').appendChild(jugador);
    }


    //agregar niveles
    function agregarniveles(nivel) {
        let colores = ["lightyellow", "tomato", "purple", "pink", "orange", "cyan"];
        let d = 0;
        let casilla;
        let izq;
        let arr;
        let fragmento = document.createDocumentFragment();
        let tablero = document.getElementById('tablero');
        let tableroarr = tablero.offsetTop;
        let tableroizq = tablero.offsetLeft;
        for (let c = 0; c < nivel.length; c++) {
            casilla = document.createElement('div');
            casilla.setAttribute('tipo', nivel[c].tipo);
            casilla.setAttribute('fila', nivel[c].fila);
            casilla.setAttribute('columna', nivel[c].columna);
            casilla.style.position = "absolute";
            casilla.style.height = "20px";
            casilla.style.width = "46.33px";
            casilla.style.backgroundColor = colores[d % colores.length];
            casilla.style.borderStyle = "inset";
            casilla.style.borderWidth = "3px";
            casilla.style.borderColor = "grey";
            casilla.className = "ficha";
            d++;
            //posicion left
            izq = tableroizq + 60 + (nivel[c].columna * 46.33);
            izq = izq + "px";
            casilla.style.left = izq;

            //posicion top
            arr = tableroarr + 40 + (nivel[c].fila * 20)
            arr = arr + "px";
            casilla.style.top = arr;
            fragmento.appendChild(casilla);
        }

        tablero.appendChild(fragmento);
        nivelactual++;
    }
    /*Mantener fichas aunque se cambie tamaño de pantalla*/
    function recolocarfichas() {

        let izq;
        let arr;
        let fichas = document.getElementsByClassName('ficha');
        let tablero = document.getElementById('tablero');
        let tableroarr = tablero.offsetTop;
        let tableroizq = tablero.offsetLeft;

        for (let c = 0; c < fichas.length; c++) {
            //posicion left
            izq = tableroizq + 60 + (fichas[c].getAttribute('columna') * 46.33);
            izq = izq + "px";
            fichas[c].style.left = izq;
            //posicion top
            arr = tableroarr + 40 + (fichas[c].getAttribute('fila') * 20)
            arr = arr + "px";
            fichas[c].style.top = arr;
        }
    }
    //crear bola inicial
    function agregarbolainicio() {
        let bola = document.createElement('div');
        let arriba;
        let izquierda;
        bola.className = "bola";
        bola.style.backgroundImage = "url('../../resources/bola.png')";
        bola.style.position = "relative";
        bola.style.height = "16px";
        bola.style.width = "16px";
        izquierda = document.getElementById('jugador').style.left;
        izquierda = izquierda.substring(0, izquierda.indexOf('px'));
        izquierda = parseInt(izquierda) + (2 * (document.getElementById('jugador').offsetWidth / 4))
        izquierda = izquierda + "px";
        arriba = document.getElementById('jugador').style.top;
        arriba = parseInt(arriba.substring(0, izquierda.indexOf('px')));
        arriba = arriba - (document.getElementById('jugador').offsetHeight * 2) + 5;
        arriba = arriba + "px";
        bola.style.left = izquierda;
        bola.style.top = arriba;
        bola.setAttribute('velocidad', 0);
        bola.setAttribute('angulo', 0);
        bola.setAttribute('puedegolp', 1);
        document.getElementById('tablero').insertBefore(bola, document.getElementById('tablero').children[1])
    }

    /*movimiento con bola cogida*/
    function movimientoantesdelanzar() {
        let bola = document.getElementsByClassName('bola')[0];
        let izquierda;
        izquierda = document.getElementById('jugador').style.left;
        izquierda = izquierda.substring(0, izquierda.indexOf('px'));
        izquierda = parseInt(izquierda) + (2 * (document.getElementById('jugador').offsetWidth / 4))
        izquierda = izquierda + "px";
        bola.style.left = izquierda;
    }

    /*saque inicial*/
    function sacar() {
        bolalanzada = true;
        document.getElementsByClassName('bola')[0].setAttribute('angulo', 30);
        document.getElementsByClassName('bola')[0].setAttribute('velocidad', 8);
    }

    /*pos angulo 0 arriba total*/

    function moverbolas() {
        let movx;
        let movy;
        let ang
        let bolas = document.getElementsByClassName('bola');
        let veloc;
        let aux;
        for (let c = 0; c < bolas.length; c++) {
            aux = false;
            ang = bolas[c].getAttribute('angulo');
            veloc = bolas[c].getAttribute('velocidad');
            /*xpos ypos*/
            if ((0 <= ang) && (ang < 90)) {
                movx = 1;
                movy = -1;
            }
            /*xpos yneg*/
            if ((90 <= ang) && (ang < 180)) {
                movx = 1;
                movy = 1;
                aux = true;
            }
            /*xneg yneg*/
            if ((180 <= ang) && (ang < 270)) {
                movx = -1;
                movy = 1;
            }
            /*xneg ypos*/
            if ((270 <= ang) && (ang < 360)) {
                aux = true;
                movx = -1;
                movy = -1;
            }



            ang = ang % 90;
            movx = movx * ang / 90 * veloc;
            movy = movy * (90 - ang) / 90 * veloc;
            if (aux) {
                aux = movx;
                movx = movy;
                movy = aux;
            }


            movy = movy + parseFloat(bolas[c].style.top.substring(0, bolas[c].style.top.indexOf('px')));
            movx = movx + parseFloat(bolas[c].style.left.substring(0, bolas[c].style.left.indexOf('px')));
            movx = movx + "px";
            movy = movy + "px";


            bolas[c].style.top = movy;
            bolas[c].style.left = movx;
        }

    }

    /*function choque bola paredes*/
    function choquebolapared() {
        let parediz = document.getElementById('tablero').offsetLeft + 20;
        let paredder = document.getElementById('tablero').offsetLeft + document.getElementById('tablero').offsetWidth - 20;
        let techo = document.getElementById('tablero').offsetTop + 20;
        let suelo = document.getElementById('tablero').offsetTop + document.getElementById('tablero').offsetHeight - 20;
        let bolas = document.getElementsByClassName('bola');
        let angulonuev;
        for (let c = 0; c < bolas.length; c++) {
            if ((bolas[c].offsetLeft < parediz) && (bolas[c].getAttribute('angulo') > 180)) {

                angulonuev = 360 - parseFloat(bolas[c].getAttribute('angulo'));
                bolas[c].setAttribute('angulo', angulonuev);
            }
            if (((bolas[c].offsetLeft + 16) > paredder) && (bolas[c].getAttribute('angulo') < 180)) {

                angulonuev = 360 - parseFloat(bolas[c].getAttribute('angulo'));
                bolas[c].setAttribute('angulo', angulonuev);
            }

            if (bolas[c].offsetTop < techo) {

                if (parseFloat(bolas[c].getAttribute('angulo')) <= 90) {
                    angulonuev = 180 - parseFloat(bolas[c].getAttribute('angulo'));
                    bolas[c].setAttribute('angulo', angulonuev);
                } else
                    if (parseFloat(bolas[c].getAttribute('angulo')) > 269) {
                        angulonuev = 540 - parseFloat(bolas[c].getAttribute('angulo'));
                        bolas[c].setAttribute('angulo', angulonuev);
                    }
            }
            if (bolas[c].offsetTop > suelo) {
                bolas[c].parentNode.removeChild(bolas[c]);

            }
        }
        if (bolas.length < 1) morir();
    }
    function bajarvidas() {
        let vidas = document.getElementById('puntuacion').querySelector('p:first-child > span').innerHTML;
        vidas = vidas - 1;
        vidas = " " + vidas;
        document.getElementById('puntuacion').querySelector('p:first-child > span').innerHTML = vidas;
    }
    /*Funcion chocar con jugador*/
    function choquebolajug() {
        let bolas = document.getElementsByClassName('bola');
        let jugador = document.getElementById('jugador');

        for (let c = 0; c < bolas.length; c++) {
            if (((jugador.offsetLeft - 15) < bolas[c].offsetLeft) && ((jugador.offsetLeft + jugador.offsetWidth) > bolas[c].offsetLeft)) {
                if ((bolas[c].offsetTop + 15 > jugador.offsetTop) && (bolas[c].offsetTop + 15 < (jugador.offsetTop + 20))) {
                    bolas[c].setAttribute('angulo', calculoangulochoquejug(jugador.offsetLeft, bolas[c].offsetLeft, jugador.offsetWidth, bolas[c].getAttribute('angulo')));
                }
            }

        }
    }
    /*Calculo angulo salida de bola al chocar, entre  280 a 80*/
    function calculoangulochoquejug(ofjug, ofbola, tamjug, angulo) {
        let angulofinal = angulo;
        let aux;
        let poschoque = ofbola - ofjug;
        if ((angulo >= 90) && (angulo <= 270)) {
            if (poschoque == tamjug / 2) {
                angulofinal = 90;


            } else if (poschoque > tamjug / 2) {
                aux = (poschoque - (tamjug / 2)) / (tamjug / 2);
                aux = aux * 70;
                angulofinal = 10 + aux;

            } else if (poschoque < tamjug / 2) {
                aux = poschoque / (tamjug / 2);
                aux = aux * 70;
                angulofinal = 280 + aux;
            }
        }

        return angulofinal;
    }
    /*Choque bola con bloques*/
    function choquebloques() {
        let fichas = document.getElementsByClassName('ficha');
        let bolas = document.getElementsByClassName('bola');
        for (let c = 0; c < fichas.length; c++) {
            for (let x = 0 ; x < bolas.length; x++) {
                if (((bolas[x].offsetLeft + 16) > fichas[c].offsetLeft) && (bolas[x].offsetLeft < (fichas[c].offsetLeft + fichas[c].offsetWidth))) {
                    if (((bolas[x].offsetTop + 16) > fichas[c].offsetTop) && (bolas[x].offsetTop < (fichas[c].offsetTop + fichas[c].offsetHeight)) && (bolas[x].getAttribute('puedegolp') == 1)) {
                        bolas[x].setAttribute('puedegolp', 0);
                        bolas[x].setAttribute('velocidad', (parseFloat(bolas[x].getAttribute('velocidad')) + 0.30));
                        recargabola = setTimeout(carga, 22);
                        choqueficha(fichas[c], bolas[x]);
                        /*calculo angulo salida choque*/
                        /*activacion de buff*/
                        /*desaparicion ficha*/

                        x = bolas.length;
                    }
                }

            }
        }


    }
    function carga() {
        let bolas = document.getElementsByClassName('bola');
        for (let b = 0; b < bolas.length; b++) {
            bolas[b].setAttribute('puedegolp', 1);
        }
        clearTimeout(recargabola);
    }
    function choqueficha(ficha, bola) {
        let angulo = bola.getAttribute('angulo');
        let derecha;
        let arriba;
        let caso;
        if (angulo <= 90) {
            derecha = bola.offsetLeft - ficha.offsetLeft;
            arriba = bola.offsetTop - ficha.offsetTop - 20;
            if (arriba > derecha) {
                caso = 0;
            }
            else {
                caso = 1;
            }
        }

        if ((angulo >= 90) && (angulo < 180)) {
            derecha = bola.offsetLeft - ficha.offsetLeft;
            arriba = bola.offsetTop - ficha.offsetTop;
            if (arriba > derecha) {
                caso = 0;
            }
            else {
                caso = 1;
            }
        }

        if ((angulo >= 180) && (angulo < 270)) {
            derecha = bola.offsetLeft - ficha.offsetLeft - 46.33;
            arriba = bola.offsetTop - ficha.offsetTop;
            if (arriba < derecha) {
                caso = 0;
            }
            else {
                caso = 2;
            }
        }

        if ((angulo >= 270) && (angulo < 360)) {
            derecha = bola.offsetLeft - ficha.offsetLeft - 46.33;
            arriba = bola.offsetTop - ficha.offsetTop - 20;
            if (arriba < derecha) {
                caso = 0;
            }
            else {
                caso = 2;
            }
        }
        cambioanguloporficha(caso, bola)
        if (ficha.getAttribute('buff') != undefined) generarpowerup(ficha);
        borrarficha(ficha);


    }

    /*Cambio angulo al chocar con ficha*/
    function cambioanguloporficha(caso, bola) {
        switch (caso) {
            case (0):
                {
                    bola.setAttribute('angulo', (360 - parseFloat(bola.getAttribute('angulo'))));
                    break;
                }
            case (1):
                {
                    bola.setAttribute('angulo', (180 - parseFloat(bola.getAttribute('angulo'))));
                    break;
                }
            case (2):
                {
                    bola.setAttribute('angulo', (540 - parseFloat(bola.getAttribute('angulo'))));
                    break;
                }
        }
    }
    /*Borrar ficha*/
    function borrarficha(ficha) {
        puntuacion = puntuacion + (5 * (ficha.getAttribute('tipo') + 1));
        document.getElementById('puntuacion').querySelector('p:last-child > span').innerHTML = " " + puntuacion;
        ficha.parentNode.removeChild(ficha);
    }

    function generarpowerup(ficha) {
        let pow = document.createElement('div');
        let aux;
        pow.setAttribute('class', 'pow');
        pow.style.position = "absolute";
        aux = ficha.offsetTop + 22;
        pow.style.top = aux + "px";
        aux = ficha.offsetLeft + 1;
        pow.style.left = aux + "px";
        pow.style.height = "22px";
        pow.style.width = "44px"

        switch (ficha.getAttribute('buff')) {
        	case ("0"):
        		{
        			pow.style.backgroundImage = "url('../../resources/pildorada.png'')";
        			break;
        		}
        	case ("1"):
        		{
        			pow.style.backgroundImage = "url('../../resources/pilverde.png')";
        			break;
        		}
        	case ("2"):
        		{
        			pow.style.backgroundImage = "url('../../resources/pilgris.png')";
        			break;
        		}
        	case ("3"):
        		{
        			pow.style.backgroundImage = "url('../../resources/pilroja.png')";
        			break;
        		}
        }
        pow.style.backgroundPosition = "0px 0px";
        document.getElementById('tablero').appendChild(pow);
    }

    /*Bajar powerup y girarlo*/
    function bajarpowerup() {
        let power = document.getElementsByClassName('pow');
        let tablero = document.getElementById('tablero');
        let bpos;
        let aux;
        for (let c = 0 ; c < power.length; c++) {
            bpos = power[c].style.backgroundPosition;
            aux = power[c].offsetTop + 11;
            power[c].style.top = aux + "px"
            power[c].style.backgroundPosition = devolverposicionnueva(bpos);
            if ((aux - 30) > tablero.offsetWidth)
            {
                power[c].parentNode.removeChild(power[c]);
            }
        }
    }
    /*devuelve nueva pos fondo de powerup*/
    function devolverposicionnueva(bpos) {
        let posicionnueva;
        let aux1;
        aux1 = bpos.split("px", 1);
        aux1[0] = parseInt(aux1[0]) - 44;
        posicionnueva = aux1[0] + "px 0px";
        return posicionnueva;
    }
	/*Coger powerup*/
    function cogerpowerup()
    {
    	let power = document.getElementsByClassName('pow');
    	let jugador = document.getElementById('jugador');
    	let jugadortop = jugador.offsetTop;
    	let jugadorleft = jugador.offsetLeft;
    	let jugadorancho = jugador.offsetWidth;
    	for(let c = 0; c < power.length; c++)
    	{
    		if(((power[c].offsetTop + 22) > jugadortop) && (power[c].offsetTop < (jugadortop + 22)))
    		{
    			if(((power[c].offsetLeft + 44) > jugadorleft) && (power[c].offsetLeft < jugadorleft + jugadorleft + jugadorancho))
    			{
    				darpowerup(power[c]);

    			}
    		}
    	}
    }
	 /*elimina el powerup y da el efecto*/
    function darpowerup(power)
    {
    	var tipo = power.style.backgroundImage;
    	console.log(tipo);
    	switch (tipo) {
			//da una vida
    		case ('url("../../resources/pildorada.png")'):
    			{
    				let vidas = parseInt(document.getElementById('puntuacion').querySelector('p:first-child > span').innerHTML);
    				vidas = vidas + 1;
    				document.getElementById('puntuacion').querySelector('p:first-child > span').innerHTML = " " + vidas;
    				break;
    			}
			//velocidad de la bola a la velocidad inicial
    		case ('url("../../resources/pilverde.png")'):
    			{
    				let bola = document.getElementsByClassName('bola')[0];
    				let velocidad = bola.getAttribute('velocidad');
    				if (velocidad > 8)
    				{
    					velocidad = 8;
    					bola.setAttribute('velocidad', velocidad);
    				}		
    				break;
    			}
			//hace al jugador grande
    		case ('url("../../resources/pilroja.png")'):
    			{
    				let jugador = document.getElementById('jugador');
    				if (jugador.style.backgroundImage != 'url("../../resources/jug2.png")') {
    					let jugadorleft = jugador.offsetLeft - document.getElementById('tablero').offsetLeft;
    					if (jugador.style.backgroundImage != 'url("../../resources/jug0.png")')
    					{
    						jugadorleft = jugadorleft - 22;   						
    					}
    					else
    					{
    						jugadorleft = jugadorleft - 11;
    					}
    					jugadorleft = jugadorleft + "px";
    					jugador.style.width = '132px';
    					jugador.style.backgroundImage = "url('../../resources/jug2.png')";
    					jugador.style.left = jugadorleft;
    				}
    				break;
    			}
			//hace al jugador pequeño
    		case ('url("../../resources/pilgris.png")'):
    			{
    				let jugador = document.getElementById('jugador');
    				if (jugador.style.backgroundImage != 'url("../../resources/jug0.png")') {
    					let jugadorleft = jugador.offsetLeft -document.getElementById('tablero').offsetLeft;
    					if (jugador.style.backgroundImage != 'url("../../resources/jug0.png")') {
    						jugadorleft = jugadorleft + 43;
    					}
    					else {
    						jugadorleft = jugadorleft + 22;
    					}
    					jugadorleft = jugadorleft + "px";
    					jugador.style.width = '46px';
    					jugador.style.backgroundImage = "url('../../resources/jug0.png')";
    					jugador.style.left = jugadorleft;
    				}
    				break;
    			}
    	}
    	power.parentNode.removeChild(power);
    }


    function morir() {

        let jug = document.getElementById('jugador');
        if (muriendo == 0) {
        	muriendo = 1;
        	if (jug.style.backgroundImage == 'url("../../resources/jug1.png")')
        	{ 
        		setTimeout(function () { jug.style.backgroundImage = "url('../../resources/muert1.png')" }, 200);
        	}
        	if (jug.style.backgroundImage == 'url("../../resources/jug0.png")')
			{
        		setTimeout(function () { jug.style.backgroundImage = "url('../../resources/muert0.png')" }, 200);
        	}
        	if (jug.style.backgroundImage == 'url("../../resources/jug2.png")')
        	{
        		setTimeout(function () { jug.style.backgroundImage = "url('../../resources/muert2.png')" }, 200);
        	}

            setTimeout(function () { jug.style.backgroundPosition = '0px 22px' }, 400);
            setTimeout(function () { jug.style.backgroundPosition = '0px 44px' }, 600);
            setTimeout(function () { jug.style.backgroundPosition = '0px 66px' }, 800);
            setTimeout(function () { jug.style.backgroundImage = 'none' }, 1000);
            bajarvidas();
            if (document.getElementById('puntuacion').querySelector('p:first-child > span').innerHTML > 0) {
                setTimeout(function () { revivir() }, 2000);
            } else {
                {
                    perder();
                }
            }
        }
    }
    /*Revivir si quedan vidas*/
    function revivir() {
        let jug = document.getElementById('jugador');
        jug.style.height = '22px';
        jug.style.width = '88px';
        jug.style.backgroundImage = "url('../../resources/jug1.png')";
        jug.style.position = "relative";
        jug.style.top = "595px";
        jug.style.left = "251px";
        muriendo = 0;
        agregarbolainicio();
        bolalanzada = false;
    }
    function perder() {
    	requestSaveRecord(puntuacion);
        let tabler = document.getElementById('tablero');
        let texto = document.createElement('h2');
        let botonRejugar = document.createElement('button');
        
        let aux;
        texto.innerHTML = "FIN DEL JUEGO";
        texto.style.color = "red";
        texto.style.fontSize = "4em"
        texto.style.position = "absolute";
        aux = tabler.offsetTop + 300;
        texto.style.top = aux + "px";
        aux = tabler.offsetLeft + 170;
        texto.style.left = aux + "px";
        tabler.appendChild(texto);

        botonRejugar.innerHTML = "Volver a jugar";
        botonRejugar.position = "absolute";
        botonRejugar.style.position = "absolute";
        aux = tabler.offsetTop + 380;
        botonRejugar.style.top = aux + "px";
        aux = tabler.offsetLeft + 160;
        botonRejugar.style.left = aux + "px";
        botonRejugar.addEventListener("click", jugarOtraVez);
        tabler.appendChild(botonRejugar);
    }
    /*etiqueta buff -> 0dorado 1verde 2gris 3rojo */
    function rellenarbloquesetiquetas() {
        let fichas = document.getElementsByClassName('ficha');
        let tipoBuff;
        for (let c = 0; c < fichas.length; c++) {
            if (fichas[c].getAttribute('tipo') != 2) {
            	if (Math.random() > 0.85) {
            		tipoBuff = Math.floor(Math.random() * 4);
            		if (tipoBuff != 0) {
            			fichas[c].setAttribute('buff', tipoBuff);
            		}
            		else
            		{
            			if (Math.random() > 0.66) fichas[c].setAttribute('buff', tipoBuff);
            		}
                }
            }
        }
    }

    function cambiarpuntuacion() {
        document.getElementById('puntuacion').querySelector('p:first-last > span').innerHTML = " " + puntuacion;
    }

    function comprobarNivelFinalizado()
    {
    	var fichas = document.getElementsByClassName('ficha');
    	if (fichas.length == 0) {
    		var jugador = document.getElementById('jugador');
    		var bola = document.getElementsByClassName('bola')[0];
    		jugador.parentNode.removeChild(jugador);
    		bola.parentNode.removeChild(bola);
    		bolalanzada = false;
    		cargarNivel();
    		nivelCompleto();
    		setTimeout(nivelCompletoBorrar, 2000);
    	}
    }
    function nivelCompleto()
    {
    	let tabler = document.getElementById('tablero');
    	var textoNivel = document.createElement('h2');
    	var textoInterior = "Nivel: " + (nivelactual);
    	textoNivel.id = 'MensajeNivel';
    	let aux;
    	textoNivel.innerHTML = textoInterior;
    	textoNivel.style.fontSize = "4em"
    	textoNivel.style.position = "absolute";
    	aux = tabler.offsetTop + 300;
    	textoNivel.style.top = aux + "px";
    	aux = tabler.offsetLeft + 190;
    	textoNivel.style.left = aux + "px";
    	tabler.appendChild(textoNivel);
    }
    function nivelCompletoBorrar()
    {
    	var mensaje = document.getElementById('MensajeNivel');
    	mensaje.parentNode.removeChild(mensaje);

    }

    function sleep(milliseconds) {
    	var start = new Date().getTime();
    	for (var i = 0; i < 1e7; i++) {
    		if ((new Date().getTime() - start) > milliseconds) {
    			break;
    		}
    	}
    }




    //valor del array tipo de ficha 0=un golpe 1=dos golpes 2= indestructible
    //aqui se guardan todos los niveles jugables
    function crearniveles() {
        let niveles = [];
        let fila = 0;
        let columna = 0;
        niveles[0] = [];
        for (let c = 1; c < 21; c++) {
            niveles[0][c - 1] =
                {
                    tipo: 0,
                    fila: fila + 3,
                    columna: columna,
                }
            if (c % 10 == 0) {
                fila++;
                columna = 0;
            } else {
                columna++;
            }
        }
        fila = 0;
        columna = 0;
        niveles[1] = [];
        for (let c = 1; c < 41; c++) {
        	niveles[1][c - 1] =
                {
                	tipo: 0,
                	fila: fila + 3,
                	columna: columna,
                }
        	if (c % 10 == 0) {
        		fila++;
        		columna = 0;
        	} else {
        		columna++;
        	}
        }

        return niveles;
    }

    
    
})();
//Funcion para guardar records en bd
function requestSaveRecord(puntuacion) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:54321/games/arcanoid";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };
    var user = document.getElementById("usuario").innerHTML;
    var time = new Date().toLocaleString();
	
    var data = JSON.stringify({ "UserName": user, "IdGame": "2", "time": time, "score": puntuacion });
    xhr.send(data);
}

function jugarOtraVez()
{
	window.location.href = "http://localhost:54321/games/arcanoid";
}