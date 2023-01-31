var canvas = document.getElementById('canva');
var ctx = canvas.getContext('2d');

var canvas_width = "1000"; 
var canvas_height= "600";

const personagem_width = 50;
const personagem_height = 80;
var troca = 0;

var camera = {x: 0, y: 0}

var keydown = [];
var debugar = false;
var x = 0;
var y = (canvas_height-personagem_height);
var sprites = null;

//imagens

//ctx.drawImage(pesonagem, troca, 0, 128, 128, 0, 0, 128, 128);
//inimigos
var inimigo1 = {
    ativado: false,
    direcao: 'left',
    velocidade: 2,
    instancia: null,
    x: canvas_width,
    y: canvas_height - 80,
    largura: 50,
    altura: 80
};
var inimigo2 = {
    ativado: false,
    direcao: 'left',
    velocidade: 1,
    instancia: null,
    x: canvas_width,
    y: canvas_height - 80,
    altura: 80,
    largura: 50,
};

window.addEventListener("keydown", function (e) {
    keydown[e.key] = true;
    if(debugar){
        console.log(e.key);
    }
})
window.addEventListener("keyup", function (e) {
    keydown[e.key] = false;
})

ctx.fillStyle = 'rgba(255,0,0,0.5)';
nochao = true;


var MORTE = false;

var forcaPulo = 0;
var gravidade = 0.09;
setInterval(()=>{
    y -= forcaPulo;
    forcaPulo -= gravidade;
},10)
function criarAvatar(){
    return canvas.getContext('2d');
}
function loopX(inimigo){
    
    //start COLISAO

    //limites jogador
    let jogadorDireita = x+personagem_width;
    let jogadorEsquerda = x;

    let jogadorCima = y + 25;
    let jogadorBaixo = y - personagem_height;

    //limites inimigo
    let inimigoDireita = inimigo.x + inimigo.largura;
    let inimigoEsquerda = inimigo.x;

    let inimigoCima = inimigo.y;
    let inimigoBaixo = inimigo.y - inimigo.largura;


    //colisao x
    let  colisaoX = jogadorDireita>=inimigoEsquerda && jogadorEsquerda < inimigoDireita;

    //colisao y
    let colisaoY = jogadorBaixo <= inimigoCima && jogadorCima > inimigoBaixo;

    jogadorBaixo <= inimigoCima && jogadorBaixo <= inimigoCima
    if(colisaoX && colisaoY){
        clearInterval()
       animacao(personagem_dead, 'dead')
    }

    if(x>inimigo.x){
        inimigo.direcao = 'right';
    }else{
        inimigo.direcao = 'left';
    }
    if(inimigo.direcao == 'left'){
        inimigo.x -= inimigo.velocidade;
    }else{
        inimigo.x += inimigo.velocidade;
    }
    if(inimigo){
        inimigo.instancia = criarAvatar();
        inimigo.ativado = true;
    }
    inimigo.instancia.fillRect(inimigo.x, inimigo.y, 50,80);
}
function animacao(pesonagem, tipo){
    if(typeof sprite != 'undefined'){
        clearInterval(sprite); 
     }
    if(tipo == 'run'){
        if(troca == 896){
            troca = 0;
        }
    }
    if(tipo == 'dead'){
        if(troca == 384){
            troca = 0;
        }
        MORTE = true;
    }
    sprite = setInterval(()=>{
        troca += 128;
        ctx.clearRect(0, 0 ,canvas_width, canvas_height)
        ctx.drawImage(pesonagem, troca, 0, 128, 128, x-20, Math.max(canvas_height-130, 0), 128, 128);
    },100);
    run.left = false;
}
function pular(){
    forcaPulo = 4.7;
}
function andarNivel(){
        ctx.translate(-canvas_width, 0);
}
var resp;
var run = {
    left: false,
    right: false
}
var pesonagem_run = new Image();
pesonagem_run.src = "file:///C:/xampp/htdocs/game/game/game_javascript/img/designersAldeia/personagem/Run.png";

var personagem_dead = new Image();
personagem_dead.src = "file:///C:/xampp/htdocs/game/game/game_javascript/img/designersAldeia/personagem/Dead.png";
function animar(){
    

    if(!keydown["ArrowRight"] && !MORTE){
        run.left = true;
        ctx.drawImage(pesonagem_run, 0, 0, 128, 128, x-15, Math.max(canvas_height-130, 0), 128, 128);
        
        //ctx.clearRect(0, 0 ,canvas_width, canvas_height)
    }
    
    if (keydown["ArrowRight"]) {
        x = x + 10;
        if(run.left){
            animacao(pesonagem_run, 'run')
        }
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
        //andarNivel();
    }
    if(x<=0){
        x=0
        
    }
    if(y>=(canvas_height-personagem_height)){
        y=(canvas_height-personagem_height)
    }

    
    //ctx.clearRect(0, 0, 1000, canvas_height);
    ctx.fillRect(x,y, personagem_width, personagem_height);
    

    if(x>=canvas_width/4 || inimigo1.ativado){
        loopX(inimigo1);
        loopX(inimigo2);
        
    }
    requestAnimationFrame(animar);
}


animar();