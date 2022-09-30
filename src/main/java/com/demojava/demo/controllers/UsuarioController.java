package com.demojava.demo.controllers;

import com.demojava.demo.dao.UsuarioDAO;
import com.demojava.demo.models.Usuario;
import com.demojava.demo.utils.JWTUtils;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDAO usuarioDAO;

    @Autowired
    private JWTUtils jwtUtils;

    @RequestMapping(value ="api/usuarios")
    public List<Usuario> list(@RequestHeader(value = "Authorization") String token){
        if (!validarToken(token)){return  null;}
        return usuarioDAO.getUsuarios();
    }

    public boolean validarToken(String token){
        String usuarioId = jwtUtils.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value ="api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String pass = argon2.hash(1,1024,1,usuario.getPassword());
        usuario.setPassword(pass);
        usuarioDAO.addUser(usuario);
    }

    @RequestMapping(value = "api/usuarios/{id}",method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token,@PathVariable Long id){
        if (!validarToken(token)){return;}
        usuarioDAO.eliminar(id);
    }

}
