var canvas = document.getElementById('canva');
var ctx = canvas.getContext('2d');

var canvas_width = "1000"; 
var canvas_height= "600";

const personagem_width = 50;
const personagem_height = 80;
var y_s = (canvas_height-personagem_height);
y_s -= 50;
var troca = 0;

var camera = {x: 0, y: 0}

var keydown = [];
var debugar = false;
var x = 0;
var x_cenario = 0;
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

ctx.fillStyle = 'white';
nochao = true;


var MORTE = false;

var movimento = 0.5;
var t = 1;

var forcaPulo = 0;
var gravidade = 0.09;
var func_pular= setInterval(()=>{
                    y -= forcaPulo;
                    forcaPulo -= gravidade;
                    y_s-=forcaPulo;
                },10);
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

    jogadorBaixo <= inimigoCima && jogadorBaixo <= inimigoCima;
    if(jogadorDireita > (canvas_width - 50) && jogadorDireita < (canvas_width + 50)){
        x_cenario++;
    }
    if(colisaoX && colisaoY){
       animacao(personagem_dead, 'dead')
    }

    if(x>inimigo.x){
        inimigo.direcao = 'right';
    }else{
        inimigo.direcao = 'left';
    }
    if(inimigo.direcao == 'left'){
        inimigo.x -= (inimigo.velocidade);
        
    }else{
        
        if(keydown["ArrowRight"] && fundo_mover){
            inimigo.x -= .7;
        }else{
            inimigo.x += (inimigo.velocidade);
        }
    }
    if(inimigo){
        inimigo.instancia = criarAvatar();
        inimigo.ativado = true;
    }
    inimigo.instancia.fillRect(inimigo.x, inimigo.y, 50,80);
    inimigo.instancia.drawImage(pesonagem_run, inimigo.x, inimigo.y, 128, 128);
}

function pararAnimacao(){
    if(typeof sprite != 'undefined'){
        clearInterval(sprite); 
     }else{
        return false;
     }
}
function limparTela(){
    ctx.clearRect(0, 0 ,canvas_width, canvas_height);
}
var i_parado = null;
var fundo_mover = false;
function animacao(pesonagem, tipo){
    let time = 100;
    pararAnimacao()
    if(tipo == 'jump'){
        console.log('jump');
        run.top = true;
    }
    if(tipo == 'run'){
        if(troca == 896){
            troca = 0;
        }
    }
    if(tipo == 'dead'){
        if(MORTE){
            return 'Está morto!';
        }
        if(troca == 384){
            troca = 0;
        }
        MORTE = true;
        time = 100
        var horizontal = y_s;
        setTimeout(()=>{
            ctx.clearRect(0, 0 ,canvas_width, canvas_height)
            ctx.drawImage(pesonagem, 0, 0, 128, 128, x-20, horizontal, 128, 128);
            setTimeout(()=>{
                ctx.clearRect(0, 0 ,canvas_width, canvas_height)
                ctx.drawImage(pesonagem, 128, 0, 128, 128, x-20, horizontal, 128, 128);
                troca+=128;
                setTimeout(()=>{
                    ctx.clearRect(0, 0 ,canvas_width, canvas_height)
                    ctx.drawImage(pesonagem, 256, 0, 128, 128, x-20, horizontal, 128, 128);
                    setTimeout(()=>{
                        ctx.clearRect(0, 0 ,canvas_width, canvas_height)
                        ctx.drawImage(pesonagem, 384, 0, 128, 128, x-20, horizontal, 128, 128);
                    },time + 100);
                },time);
            },time);
        },time);
        troca+=128;
        return 0;
    }
    sprite = setInterval(()=>{
        if(troca == 896){
            troca = 0;
        }
        
        troca += 128;
        ctx.clearRect(0, 0 ,canvas_width, canvas_height)
        //ctx.drawImage(pesonagem, troca, -120, 128, 128, x-20, Math.min(470, y_s), 128, 128);
        //
        //ctx.clearRect(0, 0 ,canvas_width, canvas_height);
        for(var i = 1; i<10;i++){
            
            if(keydown["ArrowRight"]){
                ctx.drawImage(bg, -x_cenario-500, 0, canvas_width, canvas_height);
                ctx.drawImage(bg, -x_cenario + (canvas_width)*(movimento*i), 0, canvas_width, canvas_height);
                i_parado = i;
                fundo_mover = true;
            }else{
                ctx.drawImage(bg, -x_cenario-500, 0, canvas_width, canvas_height);
                ctx.drawImage(bg, -x_cenario + (canvas_width)*(movimento*i), 0, canvas_width, canvas_height);
                fundo_mover = false;
            }
        }

    },time);
    run.right = true;
    run.left = true;
}
function pular(){
    forcaPulo = 0;
    gravidade = 0.09;
    y = 470;
    forcaPulo = 4.7;
    setTimeout(()=>{
        y -= forcaPulo;
        forcaPulo -= gravidade;
        y_s-=forcaPulo + 80;
    },10);
}
function andarNivel(){
        ctx.translate(-canvas_width, 0);
}
var resp;
var run = {
    left: false,
    right: false,
    top: false,
    bottom: false
}
function desativarTeclas(left = false, right = false, top = false, bottom = false){
    run.left = left;
    run.right = left;
    run.top = left;
    run.bottom = left;
}
var diretorio = "file:///C:/xampp/htdocs/game/game/game_javascript/img/designersAldeia/personagem/macacao/";
var bg_diretorio = "file:///C:/xampp/htdocs/game/game/game_javascript/img/placeholder.png";
var bg = new Image();
bg.src = bg_diretorio;

var pesonagem_run = new Image();
pesonagem_run.src = diretorio + "right.png";

//var personagem_dead = new Image();
//personagem_dead.src = diretorio + "Dead.png";

//var personagem_jump = new Image();
//personagem_jump.src = diretorio + "Jump.png";

bg.onload = ()=>{
    if(!fundo_mover){
        for(var i = 1; i<2;i++){
            ctx.drawImage(bg, -x_cenario-500, 0, canvas_width, canvas_height);
            ctx.drawImage(bg, -x_cenario + (canvas_width)*(movimento*i), 0, canvas_width, canvas_height);
        }
    }
}

(function animar(){
    if(!fundo_mover){
        for(var i = 1; i<2;i++){
            ctx.drawImage(bg, -x_cenario-500, 0, canvas_width, canvas_height);
            ctx.drawImage(bg, -x_cenario + (canvas_width)*(movimento*i), 0, canvas_width, canvas_height);
        }
    }
    if(!keydown["ArrowRight"] && !keydown["ArrowLeft"] && !MORTE) {
        run.right = false
        run.left = false
        //animacao(pesonagem_run, 'run', 'right');
        
        //pararAnimacao();
        
    }
    if(!keydown["ArrowRight"]) {
        run.right = false
    }
    if (keydown["ArrowRight"]) {
        x = x + 5;
        if(!run.right){
           animacao(pesonagem_run, 'run', 'right');
           run.right = true;
        }
    }
    if (keydown["ArrowLeft"]) {
        x = x - 5;
        if(!run.left){
            animacao(pesonagem_run, 'run', 'left');
            run.left = true;
            console.log(1);
         }
         
    }

    if (keydown["ArrowUp"]) {
        //cima
        if(y >= (canvas_height-personagem_height)){
        pular();
            run.top = false;
            if(!run.top){
                animacao(pesonagem_run, 'run');
            }
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
        y=(canvas_height-personagem_height);
        y_s=Math.min(470,(canvas_height-personagem_height));
    }

    //ctx.clearRect(0, 0, 1000, canvas_height);
    ctx.fillRect(x,y, personagem_width, personagem_height);

    if(x>=canvas_width/4 || inimigo1.ativado){
        loopX(inimigo1);
        loopX(inimigo2);
        
    }
    requestAnimationFrame(animar);
})();