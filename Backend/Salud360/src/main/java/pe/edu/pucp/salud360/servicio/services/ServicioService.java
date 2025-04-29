package pe.edu.pucp.salud360.servicio.services;

import pe.edu.pucp.salud360.servicio.dto.ServicioDTO;

import java.util.List;

public interface ServicioService {
    ServicioDTO crearServicio(ServicioDTO servicioDTO);
    ServicioDTO actualizarServicio(Integer idServicio, ServicioDTO servicioDTO);
    void eliminarServicio(Integer idServicio);
    List<ServicioDTO> listarServiciosTodos();
    ServicioDTO buscarServicioPorId(Integer idServicio);
}
