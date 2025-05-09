package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.RolDTO;
import pe.edu.pucp.salud360.usuario.models.Rol;

public class RolMapper {
    public static RolDTO mapToDTO(Rol rol) {
        if(rol == null)
            return null;

        return RolDTO.builder()
                .idRol(rol.getIdRol())
                .nombre(rol.getNombre())
                .descripcion(rol.getDescripcion())
                .activo(rol.getActivo())
                .permisos(PermisoMapper.mapToDTOList(rol.getPermisos()))
                .build();
    }

    public static Rol mapToModel(RolDTO rolDTO) {
        if(rolDTO == null)
            return null;

        return Rol.builder()
                .idRol(rolDTO.getIdRol())
                .nombre(rolDTO.getNombre())
                .descripcion(rolDTO.getDescripcion())
                .activo(rolDTO.getActivo())
                .permisos(PermisoMapper.mapToModelList(rolDTO.getPermisos()))
                .build();
    }
}
