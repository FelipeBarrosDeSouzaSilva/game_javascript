var canvas = document.getElementById('canva');
var ctx = canvas.getContext('2d');

var canvas_width = "1000"; 
var canvas_height= "600";
const personagem_width = 50;
const personagem_height = 80;

var camera = {x: 0, y: 0}

var keydown = [];
var debugar = false;
var x = 0;
var y = (canvas_height-personagem_height);

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

ctx.fillStyle = 'red';
nochao = true;



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
       alert( " colisaoX: " +colisaoX
        + " colisaoY: " +colisaoY);
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
function pular(){
    forcaPulo = 4.7;
}
function andarNivel(){
        ctx.translate(-canvas_width, 0);
}
var resp;
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
        //andarNivel();
    }
    if(x<=0){
        x=0
        
    }
    if(y>=(canvas_height-personagem_height)){
        y=(canvas_height-personagem_height)
    }

    
    ctx.clearRect(0, 0, 1000, canvas_height);
    ctx.fillRect(x,y, personagem_width, personagem_height);
    
    if(x>=canvas_width/4 || inimigo1.ativado){
        loopX(inimigo1);
        loopX(inimigo2);
        
    }
    requestAnimationFrame(animar);
}
var nave = new Image()
nave.src = "file:///C:/xampp/htdocs/game/game/game_javascript/img/designersAldeia/personagem/Run.png"
nave.onload = ()=>{
    ctx.drawImage(nave, 0, 0);
}

//animar();