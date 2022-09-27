// Call the dataTables jQuery plugin
$(document).ready(function() {

});



async function login(){
 let datos = {};

    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;


const request = await fetch('api/login',{
    method:'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify(datos)
});
const res = await request.text();

if(res !== 'FAIL'){
localStorage.token = res;
localStorage.email = datos.email;
location.href='tables.html'
}else{
alert('Las credenciales son incorrectas')}
}