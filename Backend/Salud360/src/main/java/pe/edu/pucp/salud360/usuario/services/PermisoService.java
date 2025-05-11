package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dtos.permisoDTO.PermisoVistaAdminDTO;
import pe.edu.pucp.salud360.usuario.dtos.rolDTO.RolResumenDTO;

import java.util.List;

public interface PermisoService {
    PermisoVistaAdminDTO crearPermiso(PermisoVistaAdminDTO permisoDTO);
    PermisoVistaAdminDTO actualizarPermiso(Integer idPermiso, PermisoVistaAdminDTO permisoDTO);
    void eliminarPermiso(Integer idPermiso);
    List<PermisoVistaAdminDTO> listarPermisosTodos();
    PermisoVistaAdminDTO buscarPermisoPorId(Integer idPermiso);

    PermisoVistaAdminDTO editarRoles(Integer idPermiso, List<RolResumenDTO> roles);
}
