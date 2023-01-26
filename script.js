var canvas = document.getElementById('canva');
var ctx = canvas.getContext('2d');
var canvas_width = "500"; 
var canvas_height= "600";
const personagem_width = 50;
const personagem_height = 80;

var keydown = [];
var debugar = false;
var x = 0;
var y = (canvas_height-personagem_height);

window.addEventListener("keydown", function (e) {
    keydown[e.key] = true;
    if(debugar){
        console.log(e.key);
    }
})
window.addEventListener("keyup", function (e) {
    keydown[e.key] = false;
})

ctx.fillStyle = 'red';
nochao = true;

var forcaPulo = 0;
var gravidade = 0.09;
setInterval(()=>{
    y -= forcaPulo;
    forcaPulo -= gravidade;
},10)
function pular(){
    forcaPulo = 4.7;
}
function animar(){
    if (keydown["ArrowRight"]) {
        x = x + 10;
    }
    if (keydown["ArrowLeft"]) {
        x = x - 10;
    }

    if (keydown["ArrowUp"]) {
        //cima
        if(y >= (canvas_height-personagem_height)){
          pular();
        }
    }
    if (keydown["ArrowDown"]) {
        y = y + 10;
        //baixo
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