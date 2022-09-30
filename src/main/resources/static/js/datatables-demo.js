// Call the dataTables jQuery plugin
$(document).ready(function() {
cargarUsuarios();
  $('#usuarios').DataTable();
  username();
});

function username(){
document.getElementById("user-name-avatar").outerHTML = localStorage.email
}

async function  cargarUsuarios(){
const request = await fetch('api/usuarios',{
    method:'GET',
    headers: getHeaders()
});

const usuarios = await request.json();

let listadoHTML = '';
for(let usuario of usuarios){
let botonEliminar = '<a href="#" onClick="eliminarUsuario('+ usuario.id +')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a>'
let tel = usuario.telefono == null ? '-': usuario.telefono;

let usuarioHTML = '<tr><td>'+ usuario.id +'</td><td>'+
                usuario.nombre +' ' + usuario.apellido +'</td><td>'+ usuario.email +
                '</td><td>'+ tel +'</td><td>'+ usuario.password
                +'</td><td>' + botonEliminar + '</td></tr>'

listadoHTML+= usuarioHTML;
}


document.querySelector('#usuarios tbody').outerHTML = listadoHTML;

console.log(usuarios);

}

function getHeaders(){
    return {
    'Accept':'application/json',
    'Content-Type':'application/json',
    'Authorization': localStorage.token
    };
}

async function eliminarUsuario(id){
console.log(id)

if (!confirm('¿Desea eliminar este Usuario?')){
return;}
const request = await fetch('api/usuarios/' + id,{
    method:'DELETE',
    headers: getHeaders()
});
location.reload();
}