package pe.edu.pucp.salud360.servicio.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.servicio.dto.ReservaDTO;
import pe.edu.pucp.salud360.servicio.repositories.ReservaRepository;
import pe.edu.pucp.salud360.servicio.services.ReservaService;

import java.util.List;

@Service
public class ReservaServiceImp implements ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public ReservaDTO crearReserva(ReservaDTO reservaDTO) {
        return null;
    }

    @Override
    public ReservaDTO actualizarReserva(Integer idReserva, ReservaDTO reservaDTO) {
        return null;
    }

    @Override
    public void eliminarReserva(Integer idReserva) {

    }

    @Override
    public List<ReservaDTO> listarReservasTodas() {
        return List.of();
    }

    @Override
    public ReservaDTO buscarReservaPorId(Integer idReserva) {
        return null;
    }
}
