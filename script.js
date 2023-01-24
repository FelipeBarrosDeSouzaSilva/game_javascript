var x = 0
var y = 0

var tecla = null

window.addEventListener("keydown", function (event) {
    tecla = event.keyCode;
})
window.addEventListener("keyup", function (event) {
    tecla = null;
})

function teste(){
    if (tecla == "68") {
        x = x + 10
        document.getElementById("object").style.left = x + "px"
    }
    if (tecla == "65") {
        x = x - 10
        document.getElementById("object").style.left = x + "px"
    }
    if (tecla == "87") {
        y = y - 10
        document.getElementById("object").style.top = y + "px"
    }
    if (tecla == "83") {
        y = y + 10
        document.getElementById("object").style.top = y + "px"
    }
    requestAnimationFrame(teste)
}
teste()