// Call the dataTables jQuery plugin
$(document).ready(function() {

});

async function  registrarUsuario(){
    let datos = {};

    datos.nombre = document.getElementById('txtNombre').value;
    datos.apellido = document.getElementById('txtApellidos').value;
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;
    datos.repetirPassword = document.getElementById('txtRepeatPassword').value;

    if(datos.password !== datos.repetirPassword){
        alert('la contraseña es diferente')
        return;
    }
const request = await fetch('api/usuarios',{
    method:'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify(datos)
});

}
