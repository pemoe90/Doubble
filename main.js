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
	colocarImagenesSuperiores();
	estiloImagenes();
}

function empezar(){
	buscarElementosImg();
	colocarImagenes();
	estiloImagenes();
}

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

function colocarImagenes(){
	colocarImagenesSuperiores();
}

function copiarArraysImagenes(){
	controlador.copiaImagenes.splice(0, controlador.copiaImagenes.length);
	
	for(i = 0; i < controlador.imagenes.length; i++){
		var aux = controlador.imagenes[i];
		controlador.copiaImagenes.push(aux);
	}
	
}

function colocarImagenesSuperiores(){
	copiarArraysImagenes();
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
	
	colocarImagenesInferiores();
}

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

function comprobarRepetido(imagen){
	if(imagen.src == controlador.imagenRepetida){
		controlador.puntos ++;
	}
	else{
		controlador.puntos --;
	}
	empezar();
}

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