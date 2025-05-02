package pe.edu.pucp.salud360.servicio.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.servicio.dto.ServicioDTO;
import pe.edu.pucp.salud360.servicio.repositories.ServicioRepository;
import pe.edu.pucp.salud360.servicio.services.ServicioService;

import java.util.List;

@Service
public class ServicioServiceImp implements ServicioService {
    @Autowired
    private ServicioRepository servicioRepository;

    @Override
    public ServicioDTO crearServicio(ServicioDTO servicioDTO) {
        return null;
    }

    @Override
    public ServicioDTO actualizarServicio(Integer idServicio, ServicioDTO servicioDTO) {
        return null;
    }

    @Override
    public void eliminarServicio(Integer idServicio) {

    }

    @Override
    public List<ServicioDTO> listarServiciosTodos() {
        return List.of();
    }

    @Override
    public ServicioDTO buscarServicioPorId(Integer idServicio) {
        return null;
    }
}
