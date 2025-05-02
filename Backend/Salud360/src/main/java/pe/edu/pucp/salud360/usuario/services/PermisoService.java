package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dto.PermisoDTO;

import java.util.List;

public interface PermisoService {
    PermisoDTO crearPermiso(PermisoDTO permisoDTO);
    PermisoDTO actualizarPermiso(Integer idPermiso, PermisoDTO permisoDTO);
    void eliminarPermiso(Integer idPermiso);
    List<PermisoDTO> listarPermisosTodos();
    PermisoDTO buscarPermisoPorId(Integer idPermiso);
}
