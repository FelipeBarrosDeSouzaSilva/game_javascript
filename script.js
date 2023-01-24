var canvas = document.getElementById('canva');
var ctx = canvas.getContext('2d');
var canvas_width ="500"; 
var canvas_height="300";

var tecla = null;
var x = 0;
var y = 0;

const personagem_width = 50;
const personagem_height = 80;

window.addEventListener("keydown", function (event) {
    tecla = event.keyCode;
})
window.addEventListener("keyup", function (event) {
    tecla = null;
})

ctx.fillStyle = 'red';

function animar(){
    if (tecla == "39") {
        x = x + 10;
    }
    if (tecla == "37") {
        x = x - 10;
    }
    if (tecla == "38") {
        y = y - 10;
    }
    if (tecla == "40") {
        y = y + 10;
    }
    //colisa canvas 

    if(x>=(canvas_width-personagem_width)){
        x=(canvas_width-personagem_width)
    }
    if(x<=0){
        x=0
    }
    if(y>=(canvas_height-personagem_height)){
        y=(canvas_height-personagem_height)
    }

    ctx.clearRect(0,0,canvas_width,canvas_height);
    ctx.fillRect(x,y, personagem_width,personagem_height);
    requestAnimationFrame(animar);
}

animar();