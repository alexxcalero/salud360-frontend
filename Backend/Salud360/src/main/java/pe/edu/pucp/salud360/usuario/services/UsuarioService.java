package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dtos.usuarioDTO.UsuarioDTO;

import java.util.List;

public interface UsuarioService {
    UsuarioDTO crearUsuario(UsuarioDTO usuarioRegistroDTO);
    UsuarioDTO actualizarUsuario(Integer idUsuario, UsuarioDTO usuarioDTO);
    void eliminarUsuario(Integer idUsuario);
    List<UsuarioDTO> listarUsuariosTodos();
    UsuarioDTO buscarUsuarioPorId(Integer idUsuario);

    UsuarioDTO actualizarNumeroDocumento(Integer idUsuario, Integer idTipoDocumento, String numeroDocumento);
    UsuarioDTO actualizarFotoPerfil(Integer idUsuario, String fotoPerfil);
    UsuarioDTO actualizarContrasenha(Integer idUsuario, String contrasenhaNueva);
    UsuarioDTO buscarUsuarioPorCorreo(String correo);
}
