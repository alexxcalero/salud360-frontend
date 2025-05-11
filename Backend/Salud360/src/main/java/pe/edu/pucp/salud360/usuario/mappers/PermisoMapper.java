package pe.edu.pucp.salud360.usuario.mappers;

import org.mapstruct.Mapper;
import pe.edu.pucp.salud360.usuario.dtos.permisoDTO.PermisoResumenDTO;
import pe.edu.pucp.salud360.usuario.dtos.permisoDTO.PermisoVistaAdminDTO;
import pe.edu.pucp.salud360.usuario.models.Permiso;

import java.util.List;

@Mapper(componentModel = "spring", uses = RolMapper.class)
public interface PermisoMapper {
    PermisoResumenDTO mapToResumenDTO(Permiso permiso);
    Permiso mapToModel(PermisoResumenDTO permisoDTO);

    PermisoVistaAdminDTO mapToVistaAdminDTO(Permiso permiso);
    Permiso mapToModel(PermisoVistaAdminDTO permisoDTO);

    List<Permiso> mapToModelList(List<PermisoResumenDTO> permisosDTO);
}
