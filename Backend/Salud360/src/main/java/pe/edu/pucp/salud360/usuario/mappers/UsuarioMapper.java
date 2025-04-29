package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.models.Usuario;

public class UsuarioMapper {
    public static UsuarioDTO mapToDTO(Usuario usuario) {
        if(usuario == null)
            return null;

        return new UsuarioDTO(usuario.getIdUsuario(), usuario.getNombres(), usuario.getApellidos(),
                              usuario.getNumeroDocumento(), usuario.getCorreo(), usuario.getContrasenha(),
                              usuario.getTelefono(), usuario.getFechaNacimiento(), usuario.getActivo(),
                              usuario.getTipoDocumento(), usuario.getRol());
    }

    public static Usuario mapToModel(UsuarioDTO usuarioDTO) {
        if(usuarioDTO == null)
            return null;

        return new Usuario(usuarioDTO.getNombres(), usuarioDTO.getApellidos(), usuarioDTO.getNumeroDocumento(),
                           usuarioDTO.getCorreo(), usuarioDTO.getContrasenha(), usuarioDTO.getTelefono(),
                           usuarioDTO.getFechaNacimiento(), usuarioDTO.getActivo(), usuarioDTO.getTipoDocumento(), usuarioDTO.getRol());
    }
}
