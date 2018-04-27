/**
 * @file Archivo JavaScript con las funciones para ejecutar el juego Dobble
 * @author Eduardo Pérez Moyano
 */

 /**
  * @namespace
  * @property {Array} imgSup Array donde se almacenan los elementos superiores imagen del html
  * @property {Array} imgInf Array donde se almacenan los elementos inferiores imagen del html
  * @property {Array} imagenes Array donde se almacen los nombres de las posibles imagenes a poner
  * @prop {Array} copiaImagenes Array para controlar las imagenes que no se han colocado
  * @prop {String} imagenRepetida Nombre de la imagen que se repetirá
  * @prop {Integer} puntos Puntos acumulados
  * @prop {Integer} tiempo Tiempo del cronometro
  * @prop {Integer} nImagenes Numero de imagenes que tiene el nivel
  */
var controlador = {
	imgSup: [],
	imgInf: [],
	imagenes: ["img/hidden1.png","img/hidden6.png","img/hidden11.png", "img/hidden16.png", "img/hidden41.png", "img/hidden43.png", "img/hidden45.png", "img/hidden46.png", "img/hidden47.png", "img/hidden48.png", "img/hidden64.png", "img/hidden69.png", "img/hidden71.png", "img/hidden76.png"],
	copiaImagenes: [],
	imagenRepetida: "",
	puntos: 0,
	tiempo : 60,
	nImagenes: 0,
};



window.onload = function (){
	crearElementoImagen(6);
	buscarElementosImg();
	colocarImagenes();
	cronometro();
}

/**
 * @function crearElementoImagen
 * @description Crea el numero de elementos imagen indicado por el parametro
 * @param {Integer} nImagenes Numero de imagenes a crear 
 */
function crearElementoImagen(nImagenes){
	controlador.nImagenes = nImagenes;
	var sup = document.getElementById("Superior");
	var inf = document.getElementById("Inferior");
	for(i = 1; i<= nImagenes; i++){
		var imagenSup = document.createElement("img");
		imagenSup.id = "Sup" + i;
		imagenSup.addEventListener("click", function(){
			comprobarImagenRepetida(this);
		})
		sup.appendChild(imagenSup);
		

		//Imagenes inferiores
		var imagenInf = document.createElement("img");
		imagenInf.id = "Inf" + i;
		imagenInf.addEventListener("click", function(){
			comprobarImagenRepetida(this);
		})
		inf.appendChild(imagenInf);
	}
}

/** 
 * @function buscarElementosImg 
 * @description Función para almacenar los elementos imagen del html para poder trabajar con ellos
*/
function buscarElementosImg(){
	var idSup = "Sup";
	var idInf = "Inf";
	var id = "";
	if(controlador.imgSup.length == 0){
		for(var i = 1; i<=controlador.nImagenes; i++){
			//busco y guardo las imagenes superiores
			id = idSup + i;
			var elemento = document.getElementById(id);
			controlador.imgSup.push(elemento);
			//busco y guardo las imagenes inferiores
			id = idInf + i;
			elemento = document.getElementById(id);
			controlador.imgInf.push(elemento);
		}
	}
	
}

/**
 * @function colocarImagenes 
 * @description Función que llama a los funciones que tratan las imagenes 
 */
function colocarImagenes(){
	copiarArray(controlador.imagenes, controlador.copiaImagenes);
	colocarImagenesSuperiores();
	colocarImagenesInferiores();
}


/** 
 * @function copiarArraysImagenes 
 * @description Función que copia el array que contiene las imagenes en otro array
 * @param {Array} arrayOrigen Array que se quiere copiar
 * @param {Array} arrayDestino Array donde se va a copiar
 */
function copiarArray(arrayOrigen, arrayDestino){
	arrayDestino.splice(0, arrayDestino.length);
	
	for(i = 0; i < arrayOrigen.length; i++){
		var aux = arrayOrigen[i];
		arrayDestino.push(aux);
	}
	
}

/**
 * @function colocarImagenesSuperiores
 * @description  Función que añade las imagenes superiores y escoge la imagen a repetir
 */
function colocarImagenesSuperiores(){
	var elementoARepetir = Math.floor(Math.random() * controlador.nImagenes - 1);
	for(i = 0; i < controlador.imgSup.length; i++){
		var longitudCopiaImagenes = controlador.copiaImagenes.length - 1;
		var aux = Math.floor(Math.random() * longitudCopiaImagenes);
		controlador.imgSup[i].src = controlador.copiaImagenes[aux];
		controlador.imgSup[i].onload = function(){
			estiloImagenes(this);
		}
		controlador.copiaImagenes.splice(aux, 1);
		if(i == elementoARepetir){
			controlador.imagenRepetida = controlador.imgSup[i].src;
		}
	}
}

/**
 * @function colocarImagenesInferiores 
 * @description Función para añadir las imagenes inferiores teniendo en cuenta que hay que repetir una 
 */
function colocarImagenesInferiores(){
	var elementoARepetir = Math.floor(Math.random() * 4);
	for(var i = 0; i < controlador.imgInf.length; i++){
		if(i == elementoARepetir){
			controlador.imgInf[i].src = controlador.imagenRepetida;
			controlador.imgInf[i].onload = function(){
				estiloImagenes(this);
			}
		}
		else{
			var longitudCopiaImagenes = controlador.copiaImagenes.length - 1;
			var aux = Math.floor(Math.random() * longitudCopiaImagenes);
			controlador.imgInf[i].src = controlador.copiaImagenes[aux];
			controlador.imgInf[i].onload = function(){
				estiloImagenes(this);
			}
			controlador.copiaImagenes.splice(aux, 1);
		}
	}
}

/**
 * @function comprobarImagenRepetida 
 * @description Comprueba si la imagen seleccionada es la repetida y actualiza los puntos
 * @param {Img} imagen Elemento imagen del html
 */
function comprobarImagenRepetida(imagen){
	var sonidoError = new Audio("sound/fallo.wav");
	var sonidoAcierto = new Audio("sound/acierto.wav");
	if(controlador.tiempo > 0){
		if(imagen.src == controlador.imagenRepetida){
			sonidoAcierto.play();
			controlador.puntos ++;
			controlador.tiempo ++;
		}
		else{
			sonidoError.play();
			controlador.puntos --;
			controlador.tiempo --;
		}
		document.getElementById("Puntos").innerHTML = "Puntos: " + controlador.puntos;
		document.getElementById("Cronometro").innerHTML = controlador.tiempo;
		colocarImagenes();
	}
	
}

/**
 * @function estiloImagenes 
 * @description Cambia aleatoriamente el tamaño y la rotacion de las imagenes
 * @param imagen Imagen a la que hay que cambiarle el estilo
 */


function estiloImagenes(imagen){
	console.log(imagen.src, imagen.naturalWidth, imagen.naturalHeight, imagen.style.width);

	if(imagen.naturalWidth >= imagen.naturalHeight){
		
		var aux = Math.floor((Math.random() * (100/controlador.nImagenes))+5);
		imagen.style.width =  aux + "%";
		imagen.style.height = "auto";


		aux = Math.floor((Math.random() * 360) + 0);
		var rotar = "rotate(" + aux + "deg)";
		imagen.style.transform = rotar;
	}

	else{
		
		var aux = Math.floor((Math.random() * (100/controlador.nImagenes))+5);
		imagen.style.height = aux + "%";
		imagen.style.width = "auto";

		aux = Math.floor((Math.random() * 360) + 0);
		var rotar = "rotate(" + aux + "deg)";
		imagen.style.transform = rotar;
	}

	
}

/**
 * @function cronometro 
 * @description Crea un cronometro en la pantalla 
 */
function cronometro(){
	controlador.tiempo --;
	document.getElementById("Cronometro").innerHTML = controlador.tiempo;
	if(controlador.tiempo > 0){
		setTimeout(cronometro, 1000);
	}
}
