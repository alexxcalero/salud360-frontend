package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.RolDTO;
import pe.edu.pucp.salud360.usuario.models.Rol;

public class RolMapper {
    public static RolDTO mapToDTO(Rol rol) {
        if(rol == null)
            return null;

        return new RolDTO(rol.getIdRol(), rol.getNombre(), rol.getDescripcion(), rol.getActivo(), rol.getUsuarios(), rol.getPermisos());
    }

    public static Rol mapToModel(RolDTO rolDTO) {
        if(rolDTO == null)
            return null;

        return new Rol(rolDTO.getIdRol(), rolDTO.getNombre(), rolDTO.getDescripcion(), rolDTO.getActivo(), rolDTO.getUsuarios(), rolDTO.getPermisos());
    }
}
