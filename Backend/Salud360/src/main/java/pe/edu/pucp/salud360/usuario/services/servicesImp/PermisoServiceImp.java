package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.PermisoDTO;
import pe.edu.pucp.salud360.usuario.repositories.PermisoRepository;
import pe.edu.pucp.salud360.usuario.services.PermisoService;

import java.util.List;

@Service
public class PermisoServiceImp implements PermisoService {
    @Autowired
    private PermisoRepository permisoRepository;

    @Override
    public PermisoDTO crearPermiso(PermisoDTO permisoDTO) {
        return null;
    }

    @Override
    public PermisoDTO actualizarPermiso(Integer idPermiso, PermisoDTO permisoDTO) {
        return null;
    }

    @Override
    public void eliminarPermiso(Integer idPermiso) {

    }

    @Override
    public List<PermisoDTO> listarPermisosTodos() {
        return List.of();
    }

    @Override
    public PermisoDTO buscarPermisoPorId(Integer idPermiso) {
        return null;
    }
}
