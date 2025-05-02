package pe.edu.pucp.salud360.servicio.services;

import pe.edu.pucp.salud360.servicio.dto.ClaseDTO;

import java.util.List;

public interface ClaseService {
    ClaseDTO crearClase(ClaseDTO claseDTO);
    ClaseDTO actualizarClase(Integer idClase, ClaseDTO claseDTO);
    void eliminarClase(Integer idClase);
    List<ClaseDTO> listarClasesTodas();
    ClaseDTO buscarClasePorId(Integer idClase);
}
