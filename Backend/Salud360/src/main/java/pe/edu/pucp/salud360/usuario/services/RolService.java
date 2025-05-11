package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dtos.rolDTO.RolVistaAdminDTO;

import java.util.List;

public interface RolService {
    RolVistaAdminDTO crearRol(RolVistaAdminDTO rolDTO);
    RolVistaAdminDTO actualizarRol(Integer idRol, RolVistaAdminDTO rolDTO);
    void eliminarRol(Integer idRol);
    List<RolVistaAdminDTO> listarRolesTodos();
    RolVistaAdminDTO buscarRolPorId(Integer idRol);
}
