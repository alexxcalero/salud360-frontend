package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.PermisoDTO;
import pe.edu.pucp.salud360.usuario.models.Permiso;

import java.util.List;

public class PermisoMapper {
    public static PermisoDTO mapToDTO(Permiso permiso) {
        if(permiso == null)
            return null;

        return PermisoDTO.builder()
                .idPermiso(permiso.getIdPermiso())
                .nombre(permiso.getNombre())
                .descripcion(permiso.getDescripcion())
                .activo(permiso.getActivo())
                .build();
    }

    public static List<PermisoDTO> mapToDTOList(List<Permiso> permisos) {
        if (permisos == null)
            return null;

        return permisos.stream().map(PermisoMapper::mapToDTO).toList();
    }

    public static Permiso mapToModel(PermisoDTO permisoDTO) {
        if(permisoDTO == null)
            return null;

        return Permiso.builder()
                .idPermiso(permisoDTO.getIdPermiso())
                .nombre(permisoDTO.getNombre())
                .descripcion(permisoDTO.getDescripcion())
                .activo(permisoDTO.getActivo())
                .build();
    }

    public static List<Permiso> mapToModelList(List<PermisoDTO> permisos) {
        if (permisos == null)
            return null;

        return permisos.stream().map(PermisoMapper::mapToModel).toList();
    }
}
