package pe.edu.pucp.salud360.usuario.mappers;

import org.mapstruct.Mapper;
import pe.edu.pucp.salud360.usuario.dtos.rolDTO.RolResumenDTO;
import pe.edu.pucp.salud360.usuario.dtos.rolDTO.RolVistaAdminDTO;
import pe.edu.pucp.salud360.usuario.models.Rol;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PermisoMapper.class, UsuarioMapper.class})
public interface RolMapper {
    RolResumenDTO mapToRolDTO(Rol rol);
    Rol mapToModel(RolResumenDTO rolDTO);

    RolVistaAdminDTO mapToVistaAdminDTO(Rol rol);
    Rol mapToModel(RolVistaAdminDTO rolDTO);

    List<Rol> mapToModelList(List<RolResumenDTO> rolesDTO);
}
