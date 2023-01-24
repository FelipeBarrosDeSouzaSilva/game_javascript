var canvas = document.getElementById('canva');
var ctx = canvas.getContext('2d');
var canvas_width ="300"; 
var canvas_height ="500";

function animar(){
    

    requestAnimationFrame(animar)
}
ctx.fillStyle = 'red';
ctx.fillRect(0,0, 50,50);