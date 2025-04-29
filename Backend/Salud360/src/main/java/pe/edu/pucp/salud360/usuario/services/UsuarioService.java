package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dto.UsuarioDTO;

import java.util.List;

public interface UsuarioService {
    UsuarioDTO crearUsuario(UsuarioDTO usuarioRegistroDTO);
    UsuarioDTO actualizarUsuario(Integer idUsuario, UsuarioDTO usuarioDTO);
    void eliminarUsuario(Integer idUsuario);
    List<UsuarioDTO> listarUsuariosTodos();
    UsuarioDTO buscarUsuarioPorId(Integer idUsuario);
}
