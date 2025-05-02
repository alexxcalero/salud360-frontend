package pe.edu.pucp.salud360.servicio.services;

import pe.edu.pucp.salud360.servicio.dto.ReservaDTO;

import java.util.List;

public interface ReservaService {
    ReservaDTO crearReserva(ReservaDTO reservaDTO);
    ReservaDTO actualizarReserva(Integer idReserva, ReservaDTO reservaDTO);
    void eliminarReserva(Integer idReserva);
    List<ReservaDTO> listarReservasTodas();
    ReservaDTO buscarReservaPorId(Integer idReserva);
}
