package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.PermisoDTO;
import pe.edu.pucp.salud360.usuario.models.Permiso;

public class PermisoMapper {
    public static PermisoDTO mapToDTO(Permiso permiso) {
        if(permiso == null)
            return null;

        return new PermisoDTO(permiso.getIdPermiso(), permiso.getNombre(), permiso.getDescripcion(), permiso.getActivo(), permiso.getRoles());
    }

    public static Permiso mapToModel(PermisoDTO permisoDTO) {
        if(permisoDTO == null)
            return null;

        return new Permiso(permisoDTO.getIdPermiso(), permisoDTO.getNombre(), permisoDTO.getDescripcion(), permisoDTO.getActivo(), permisoDTO.getRoles());
    }
}
