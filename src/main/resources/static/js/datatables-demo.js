// Call the dataTables jQuery plugin
$(document).ready(function() {
cargarUsuarios();
  $('#usuarios').DataTable();
});

async function  cargarUsuarios(){
const request = await fetch('api/usuarios',{
    method:'GET',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
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

async function eliminarUsuario(id){
console.log(id)

if (!confirm('¿Desea eliminar este Usuario?')){
return;}
const request = await fetch('api/usuarios/' + id,{
    method:'DELETE',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
});
location.reload();
}