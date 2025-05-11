package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dtos.usuarioDTO.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.models.Usuario;

public class UsuarioMapper {
    public static UsuarioDTO mapToDTO(Usuario usuario) {
        if(usuario == null)
            return null;

        return UsuarioDTO.builder()
                .idUsuario(usuario.getIdUsuario())
                .nombres(usuario.getNombres())
                .apellidos(usuario.getApellidos())
                .numeroDocumento(usuario.getNumeroDocumento())
                .correo(usuario.getCorreo())
                .contrasenha(usuario.getContrasenha())
                .telefono(usuario.getTelefono())
                .sexo(usuario.getSexo())
                .fotoPefil(usuario.getFotoPerfil())
                .fechaNacimiento(usuario.getFechaNacimiento())
                .activo(usuario.getActivo())
                //.tipoDocumento(TipoDocumentoMapper.mapToDTO(usuario.getTipoDocumento()))
                //.rol(RolMapper.mapToDTO(usuario.getRol()))
                .build();
    }

    public static Usuario mapToModel(UsuarioDTO usuarioDTO) {
        if(usuarioDTO == null)
            return null;

        return Usuario.builder()
                .idUsuario(usuarioDTO.getIdUsuario())
                .nombres(usuarioDTO.getNombres())
                .apellidos(usuarioDTO.getApellidos())
                .numeroDocumento(usuarioDTO.getNumeroDocumento())
                .correo(usuarioDTO.getCorreo())
                .contrasenha(usuarioDTO.getContrasenha())
                .telefono(usuarioDTO.getTelefono())
                .sexo(usuarioDTO.getSexo())
                .fotoPerfil(usuarioDTO.getFotoPefil())
                .fechaNacimiento(usuarioDTO.getFechaNacimiento())
                .activo(usuarioDTO.getActivo())
                //.tipoDocumento(TipoDocumentoMapper.mapToModel(usuarioDTO.getTipoDocumento()))
                //.rol(RolMapper.mapToModel(usuarioDTO.getRol()))
                .build();
    }
}
