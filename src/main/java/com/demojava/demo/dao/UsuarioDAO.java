package com.demojava.demo.dao;

import com.demojava.demo.models.Usuario;

import java.util.List;

public interface UsuarioDAO {


    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);

    List<Usuario> getUsuarios();
    void eliminar(Long id);

    void addUser(Usuario usuario);
}
