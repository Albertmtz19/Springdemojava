package com.demojava.demo.controllers;


import com.demojava.demo.dao.UsuarioDAO;
import com.demojava.demo.models.Usuario;
import com.demojava.demo.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDAO usuarioDAO;
    @Autowired
    private JWTUtils jwtUtils;

    @RequestMapping(value ="api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){

        Usuario usuarioLogeado = usuarioDAO.obtenerUsuarioPorCredenciales(usuario);

        if(usuarioLogeado != null){


            String tokenJWT = jwtUtils.create(String.valueOf(usuarioLogeado.getId()),usuarioLogeado.getEmail());
            return tokenJWT;

        }
        return "FAIL";
    }
}
