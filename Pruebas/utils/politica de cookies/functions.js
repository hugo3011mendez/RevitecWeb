window.onload=init;
function init(){
    bloqueRGPD = document.getElementById("emergenteRGPD");
    if(detectCookie("rgpdOK")){
        if (getCookie("rgpdOK")==1){eliminarBloqueRGPD();}
    }else{
        document.getElementById("botonRGPD").addEventListener("click",function(){
        eliminarBloqueRGPD();
        setCookie("rgpdOK",1,365);
        })        
    }
}

function eliminarBloqueRGPD(){
    bloqueRGPD.parentNode.removeChild(bloqueRGPD);
}