package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dto.RolDTO;

import java.util.List;

public interface RolService {
    RolDTO crearRol(RolDTO rolDTO);
    RolDTO actualizarRol(Integer idRol, RolDTO rolDTO);
    void eliminarRol(Integer idRol);
    List<RolDTO> listarRolesTodos();
    RolDTO buscarRolPorId(Integer idRol);
}
