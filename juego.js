 document.addEventListener('keydown', function(evento){
  if(evento.keyCode == 32){
    console.log("salta");
    if(nivel.muerto == false)
      saltar();
    else{
      nivel.velocidad = 9;
      nube.velocidad = 1;
      tubo.x = ancho + 100;
      nube.x = ancho + 100;
      nivel.marcador = 0;
      nivel.muerto = false;

    }
  }
});

var imgPersona, imgNube, imgTubo, imgSuelo;
function cargaImagenes(){
  imgPersona = new Image();
  imgSuelo = new Image();
  imgTubo = new Image();
  imgNube = new Image();



  imgPersona.src = 'img/persona.png';
  imgSuelo.src = 'img/suelo2.png';
  imgTubo.src = 'img/tubo.png';
  imgNube.src = 'img/nube1.png';

}


var ancho = 700;
var alto = 300;
var canvas,ctx;

function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  cargaImagenes();
}

function borraCanvas(){
  canvas.width = ancho;
  canvas.height = alto;

}

var suelo = 200;
var perso = {y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false};
var nivel = {velocidad: 9, marcador: 0, muerto: false };
var tubo ={x: ancho + 100 ,y: suelo-12 };
var nube = {x: 400, y:100, velocidad: 1};
var suelog = {x:0, y:suelo+10};

function dibujaPersona(){
  ctx.drawImage(imgPersona,0,0,400,346,100,perso.y,50,50)
}

///////////////////////////////////////////////////////////

function dibujaSuelo(){
  ctx.drawImage(imgSuelo,suelog.x,0,700,30,0,suelog.y,700,30);

}

function dibujaTubo(){
  ctx.drawImage(imgTubo,0,0,38,75,tubo.x,tubo.y,38,75);
}

function logicaSuelo(){
  if(suelog.x > 700){
    suelog.x = 0 ;
  }
  else{
    suelog.x += nivel.velocidad;
  }
}

function logicaTubo(){
  if(tubo.x < -100){
    tubo.x = ancho + 100;
    nivel.marcador++;
  }
  else{
    tubo.x -= nivel.velocidad;
  }
}

function dibujaNube(){
  ctx.drawImage(imgNube,0,0,82,31,nube.x,nube.y,82,31);

}

function logicaNube(){
  if(nube.x < -100){
    nube.x = ancho + 100;
  }
  else{
    nube.x -= nube.velocidad;
  }
}

function saltar(){
  perso.saltando = true;
  perso.vy = perso.salto;

}

function gravedad(){
  if(perso.saltando == true){

    if(perso.y - perso.vy - perso.gravedad > suelo){
      perso.saltando = false;
      perso.vy = 0;
      perso.y = suelo;
    }
    else{
      perso.vy -= perso.gravedad;
      perso.y -=perso.vy;
    }

  }

}


function colision(){

  //tubo.x
  //perso.x
  if(tubo.x >= 100 && tubo.x <= 150){
    if(perso.y >= suelo-12){
      nivel.muerto = true;
      nivel.velocidad= 0;
      nube.velocidad = 0;
    }
  }
}


function puntuacion(){
  ctx.font = "30px impact";
  ctx.fillStyle = '#FF0000';
  ctx.fillText(`${nivel.marcador}`,600,50);

  if(nivel.muerto == true){
    ctx.font = "60px impact";
    ctx.fillText(`GAME OVER`,240,150);
  }
}



//---------------------------------------------------
//bucle principal

var FPS = 50;
setInterval(function(){
  principal();
},1000/FPS);





function principal(){
  borraCanvas();
  gravedad();
  colision();
  logicaSuelo();
  logicaTubo();
  logicaNube();
  dibujaSuelo();
  dibujaTubo();
  dibujaNube();
  dibujaPersona();
  puntuacion();
}
