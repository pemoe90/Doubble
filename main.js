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
  */
var controlador = {
	imgSup: [],
	imgInf: [],
	imagenes: ["img/1.png", "img/2.png", "img/3.png" ,"img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/8.png", "img/9.png"],
	copiaImagenes: [],
	imagenRepetida: "",
	puntos: 0,
};



window.onload = function (){
	buscarElementosImg();
	colocarImagenes();
	estiloImagenes();
}

/**
 * @function crearTablero 
 * @description Función para crear un nuevo tablero
 */
function crearTablero(){
	buscarElementosImg();
	colocarImagenes();
	estiloImagenes();
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
		for(var i = 1; i<=5; i++){
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
	copiarArraysImagenes();
	colocarImagenesSuperiores();
	colocarImagenesInferiores();
}


/** 
 * @function copiarArraysImagenes 
 * @description Función que copia el array que contiene las imagenes en otro array
 */
function copiarArraysImagenes(){
	controlador.copiaImagenes.splice(0, controlador.copiaImagenes.length);
	
	for(i = 0; i < controlador.imagenes.length; i++){
		var aux = controlador.imagenes[i];
		controlador.copiaImagenes.push(aux);
	}
	
}

/**
 * @function colocarImagenesSuperiores
 * @description  Función que añade las imagenes superiores y escoge la imagen a repetir
 */
function colocarImagenesSuperiores(){
	var elementoARepetir = Math.floor(Math.random() * 4);
	for(i = 0; i < controlador.imgSup.length; i++){
		var longitudCopiaImagenes = controlador.copiaImagenes.length - 1;
		var aux = Math.floor(Math.random() * longitudCopiaImagenes);
		controlador.imgSup[i].src = controlador.copiaImagenes[aux];
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
		}
		else{
			var longitudCopiaImagenes = controlador.copiaImagenes.length - 1;
			var aux = Math.floor(Math.random() * longitudCopiaImagenes);
			controlador.imgInf[i].src = controlador.copiaImagenes[aux];
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
	if(imagen.src == controlador.imagenRepetida){
		controlador.puntos ++;
	}
	else{
		controlador.puntos --;
	}
	crearTablero();
}

/**
 * @function estiloImagenes 
 * @description Cambia aleatoriamente el tamaño y la rotacion de las imagenes
 */
function estiloImagenes(){
	for(i = 0; i < controlador.imgSup.length; i++){
		//imagenes superiores
		var aux = Math.floor((Math.random() * 5) + 5);
		controlador.imgSup[i].style.width = aux + "%";

		aux = Math.floor((Math.random() * 360) + 0);
		var rotar = "rotate(" + aux + "deg)";
		controlador.imgSup[i].style.transform = rotar;

		//imagenes inferiores
		aux = Math.floor((Math.random() * 5) + 5);
		controlador.imgInf[i].style.width = aux + "%";

		aux = Math.floor((Math.random() * 360) + 0);
		rotar = "rotate(" + aux + "deg)";
		controlador.imgInf[i].style.transform = rotar;
		
	}
}