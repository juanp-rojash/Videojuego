let iconos = []
let selecciones = []
let sec = 0
let escala = 1
let contador = 0
let reiniciar
let puntos = parseInt(localStorage.getItem("Puntos"))

var intervalo

generarTablero()

function cargarIconos() {
    iconos = [
        '<i class="fa-brands fa-twitter"></i>',
        '<i class="fa-brands fa-spotify"></i>',
        '<i class="fa-brands fa-linkedin"></i>',
        '<i class="fa-brands fa-redhat"></i>',
        '<i class="fa-brands fa-instagram"></i>',
        '<i class="fa-brands fa-linux"></i>',
        '<i class="fa-brands fa-ubuntu"></i>',
        '<i class="fa-brands fa-whatsapp"></i>',
        '<i class="fa-brands fa-google-drive"></i>',
        '<i class="fa-brands fa-google-play"></i>',
        '<i class="fa-brands fa-reddit"></i>'
    ]
}

function generarTablero() {
    
    cargarIconos()
    selecciones = []
    intervalo = setInterval(tiempo, 200)
    reiniciar = document.getElementById("nuevo-juego")

    let tablero = document.getElementById("tablero")
    let tarjetas = []
    let relleno = document.getElementById("barra")

    relleno.style.transform = "scaleX(1)"
    clearInterval(intervalo)
    intervalo = setInterval(tiempo, 200)
    reiniciar.className = "ocultar"
    document.getElementById("acumulados").innerHTML = puntos

    for(let i=0; i<18; i++){
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    <i class="fa-solid fa-circle-question"></i>
                </div>
            </div>
        </div>    
        `)
        if(i%2 == 1){
            iconos.splice(0, 1)
        }
    }
    tarjetas.sort(()=>Math.random()-0.5)
    tablero.innerHTML = tarjetas.join(" ")
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta"+i)

    if(tarjeta.style.transform != "rotateY(180deg)"){
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if(selecciones.length == 2){
       deseleccionar(selecciones) 
       selecciones = []
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if(trasera1.innerHTML != trasera2.innerHTML){
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotatey(0deg)"
        }
        else{
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
            contador += 2
            puntos = puntos + 200 - sec
            document.getElementById("acumulados").innerHTML = puntos

            if(contador == 18){
                clearInterval(intervalo)
                ocultar(0)
            }
        }
    }, 1000);
}

function tiempo() {

    escala = escala - 0.01
    sec++;

    let relleno = document.getElementById("barra")
    relleno.style.transform = "scaleX("+escala+")"

    if(sec == 100){
        clearInterval(intervalo)
        sec = 0;
        escala = 1
        ocultar(1)
    }
}

function ocultar(id){
    if(id == 1){
        let reiniciar = document.getElementById("nuevo-juego")
        reiniciar.className = ""
        sec = 0;
        escala = 1
        contador = 0
    }
    else{
        let siguiente = document.getElementById("nuevo-nivel")
        siguiente.className = ""
        localStorage.setItem("Puntos", puntos)
    }
}