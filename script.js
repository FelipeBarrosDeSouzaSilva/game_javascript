var canvas = document.getElementById('canva');
var ctx = canvas.getContext('2d');

var canvas_width = "1000"; 
var canvas_height= "600";

function criarAvatar(){
    return canvas.getContext('2d');
}

var player1 = {
    instancia: criarAvatar(),
    personagem_width: 50,
    personagem_height: 80,
    y_s: CHAO,
    distancia_X: 0
}

var VELOCIIDADE_PLAYERS = 4;

var alturaChao = 100;
var CHAO = (canvas_height-player1.personagem_height) - 100;
var y_s = CHAO;
y_s -= 50;
var troca = 0;

var camera = {x: 0, y: 0}
const QUANT_CENARIO = 30;
var VELOCIDADE_CENARIO = 3;

var keydown = [];
var debugar = false;
var x = 0;
var x_cenario = 0;
var y = CHAO;
var sprites = null;

//imagens

//ctx.drawImage(pesonagem, troca, 0, 128, 128, 0, 0, 128, 128);
//inimigos

const EMPURRAR_LEFT = 1;
var inimigo1 = {
    ativado: false,
    direcao: 'left',
    velocidade: 1,
    instancia: null,
    x: canvas_width,
    y: CHAO,
    largura: 50,
    altura: 80
};
var inimigo2 = {
    ativado: false,
    direcao: 'left',
    velocidade: 1,
    instancia: null,
    x: canvas_width,
    y: CHAO,
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

//player1.instancia.fillStyle = 'white';
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
var troca_f1 = 0;
setInterval(()=>{
    if(troca_f1 == 0){
        troca_f1 = 128;
    }else{
        troca_f1 = 0;
    }
}, 250)

function loopX(inimigo){
    var fimTela = x>=(canvas_width-player1.personagem_width) - 200;
    //start COLISAO

    //limites jogador
    let jogadorDireita = x+player1.personagem_width;
    let jogadorEsquerda = x;

    let jogadorCima = y + 25;
    let jogadorBaixo = y - player1.personagem_height;

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
    if(jogadorDireita > (canvas_width - 250) && jogadorDireita < (canvas_width + 50) && keydown["ArrowRight"]){
        x_cenario += VELOCIDADE_CENARIO;
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
        
        if(keydown["ArrowRight"] && fimTela){
            //inimigo.x -= EMPURRAR_LEFT;
            inimigo1.velocidade = 2;
            inimigo2.velocidade = 2;
        }else{
            inimigo.x += (inimigo.velocidade);
        }
    }
    if(inimigo){
        inimigo.instancia = criarAvatar();
        inimigo.ativado = true;
    }
    //inimigo.instancia.fillRect(inimigo.x, inimigo.y, 50,80);
    
    inimigo.instancia.drawImage(fantasma, troca_f1, 0, 128, 128, inimigo.x - 30, (inimigo.y - 20), 128, 138);
    
    
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
function animacao(pesonagem, tipo, personagem){
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
            player1.instancia.drawImage(pesonagem, 0, 0, 128, 128, x-20, horizontal, 128, 128);
            setTimeout(()=>{
                ctx.clearRect(0, 0 ,canvas_width, canvas_height)
                player1.instancia.drawImage(pesonagem, 128, 0, 128, 128, x-20, horizontal, 128, 128);
                troca+=128;
                setTimeout(()=>{
                    ctx.clearRect(0, 0 ,canvas_width, canvas_height)
                    player1.instancia.drawImage(pesonagem, 256, 0, 128, 128, x-20, horizontal, 128, 128);
                    setTimeout(()=>{
                        ctx.clearRect(0, 0 ,canvas_width, canvas_height)
                        player1.instancia.drawImage(pesonagem, 384, 0, 128, 128, x-20, horizontal, 128, 128);
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
        player1.instancia.drawImage(pesonagem, troca, -120, 128, 128, x-20, Math.min(470, y_s), 128, 128);
        //
        //ctx.clearRect(0, 0 ,canvas_width, canvas_height);
        for(var i = 1; i<QUANT_CENARIO;i++){
            
            if(keydown["ArrowRight"]){
                ctx.drawImage(bg, -x_cenario-500, 0, canvas_width, canvas_height);
                ctx.drawImage(bg, -x_cenario + (canvas_width)*(movimento*i), 0, canvas_width, canvas_height);
                i_parado = i;
                fundo_mover = true;
                player1.distancia_X += 5;
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
var diretorio = "./img/designersAldeia/personagem/macacao/";
var bg_diretorio = "./img/placeholder.png";
var bg = new Image();
bg.src = bg_diretorio;

var fantasma = new Image();
fantasma.src = diretorio + "../fantasma/fantasma.png";

var pesonagem_run = new Image();
pesonagem_run.src = diretorio + "left.png";



var pesonagem_right = new Image();
pesonagem_right.src = diretorio + "External.png";


//var personagem_dead = new Image();
//personagem_dead.src = diretorio + "Dead.png";

//var personagem_jump = new Image();
//personagem_jump.src = diretorio + "Jump.png";


(function animar(){

    if(!keydown["ArrowRight"] && !keydown["ArrowLeft"] && !MORTE) {
        run.right = false
        run.left = false
    }
    if(!keydown["ArrowRight"]) {
        run.right = false
        fundo_mover = false
    }
    if (keydown["ArrowRight"]) {
        x = x + VELOCIIDADE_PLAYERS;
        player1.distancia_X += 5;
        if(!run.right){
           animacao(pesonagem_right, 'run', 'right');
           run.right = true;
        }
    }
    if (keydown["ArrowLeft"]) {
        x = x - VELOCIIDADE_PLAYERS;
        if(!run.left){
            animacao(pesonagem_run, 'run', 'left');
            run.left = true;
            console.log(1);
         }
         
    }

    if (keydown["ArrowUp"]) {
        //cima
        if(y >= CHAO){
        pular();
            run.top = false;
            if(!run.top){
                animacao(pesonagem_run, 'run', 'inimigo');
            }
        }
    }
    if (keydown["ArrowDown"]) {
        y = y + 10;
        //baixo
    }

    //colisa canvas 
    if(x>=(canvas_width-player1.personagem_width) - 200){
        inimigo1.x -= EMPURRAR_LEFT;
        inimigo2.x -= EMPURRAR_LEFT;
        inimigo1.x -= 2
        inimigo2.x -= 2
        x=(canvas_width-player1.personagem_width) - 200
    }
    if(x<=0){
        x=0
        
    }
    if(y>=CHAO){
        y=CHAO;
        y_s=Math.min(470,CHAO);
    }

    //ctx.clearRect(0, 0, 1000, canvas_height);
    //player1.instancia.fillRect(x,y, player1.personagem_width, player1.personagem_height);
    player1.instancia.drawImage(pesonagem_right, 0, 0, 128, 128, x-35, y-50, 128, 128);

    if(x>=canvas_width/4 - 50 || inimigo1.ativado){
        loopX(inimigo1);
    }
    if(player1.distancia_X >= 30800 || inimigo2.ativado){
        loopX(inimigo2);
        console.log(2)
    }
    requestAnimationFrame(animar);
})();

//iniciar cenario, só precisa movimentar um pouco o player
keydown["ArrowRight"] = true
setTimeout(()=>{
    keydown["ArrowRight"] = false
},5)
//atualizacao 14/02/2023
