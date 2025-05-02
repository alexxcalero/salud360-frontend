package pe.edu.pucp.salud360.servicio.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.servicio.dto.CitaMedicaDTO;
import pe.edu.pucp.salud360.servicio.repositories.CitaMedicaRepository;
import pe.edu.pucp.salud360.servicio.services.CitaMedicaService;

import java.util.List;

@Service
public class CitaMedicaServiceImp implements CitaMedicaService {
    @Autowired
    private CitaMedicaRepository citaMedicaRepository;

    @Override
    public CitaMedicaDTO crearCitaMedica(CitaMedicaDTO citaMedicaDTO) {
        return null;
    }

    @Override
    public CitaMedicaDTO actualizarCitaMedica(Integer idCitaMedica, CitaMedicaDTO citaMedicaDTO) {
        return null;
    }

    @Override
    public void eliminarCitaMedica(Integer idCitaMedica) {

    }

    @Override
    public List<CitaMedicaDTO> listarCitasMedicasTodas() {
        return List.of();
    }

    @Override
    public CitaMedicaDTO buscarCitaMedicaPorId(Integer idCitaMedica) {
        return null;
    }
}
