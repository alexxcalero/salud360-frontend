package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.RolDTO;
import pe.edu.pucp.salud360.usuario.repositories.RolRepository;
import pe.edu.pucp.salud360.usuario.services.RolService;

import java.util.List;

@Service
public class RolServiceImp implements RolService {
    @Autowired
    private RolRepository rolRepository;

    @Override
    public RolDTO crearRol(RolDTO rolDTO) {
        return null;
    }

    @Override
    public RolDTO actualizarRol(Integer idRol, RolDTO rolDTO) {
        return null;
    }

    @Override
    public void eliminarRol(Integer idRol) {

    }

    @Override
    public List<RolDTO> listarRolesTodos() {
        return List.of();
    }

    @Override
    public RolDTO buscarRolPorId(Integer idRol) {
        return null;
    }
}
