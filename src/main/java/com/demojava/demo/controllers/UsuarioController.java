package com.demojava.demo.controllers;

import com.demojava.demo.dao.UsuarioDAO;
import com.demojava.demo.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDAO usuarioDAO;

    @RequestMapping(value ="api/usuarios")
    public List<Usuario> list(){
        return usuarioDAO.getUsuarios();
    }

    @RequestMapping(value ="api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String pass = argon2.hash(1,1024,1,usuario.getPassword());
        usuario.setPassword(pass);
        usuarioDAO.addUser(usuario);
    }

    @RequestMapping(value = "api/usuarios/{id}",method = RequestMethod.DELETE)
    public void eliminar(@PathVariable Long id){
        usuarioDAO.eliminar(id);
    }

}
