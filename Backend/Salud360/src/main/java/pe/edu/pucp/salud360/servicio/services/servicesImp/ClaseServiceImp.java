package pe.edu.pucp.salud360.servicio.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.servicio.dto.ClaseDTO;
import pe.edu.pucp.salud360.servicio.repositories.ClaseRepository;
import pe.edu.pucp.salud360.servicio.services.ClaseService;

import java.util.List;

@Service
public class ClaseServiceImp implements ClaseService {
    @Autowired
    private ClaseRepository claseRepository;

    @Override
    public ClaseDTO crearClase(ClaseDTO claseDTO) {
        return null;
    }

    @Override
    public ClaseDTO actualizarClase(Integer idClase, ClaseDTO claseDTO) {
        return null;
    }

    @Override
    public void eliminarClase(Integer idClase) {

    }

    @Override
    public List<ClaseDTO> listarClasesTodas() {
        return List.of();
    }

    @Override
    public ClaseDTO buscarClasePorId(Integer idClase) {
        return null;
    }
}
