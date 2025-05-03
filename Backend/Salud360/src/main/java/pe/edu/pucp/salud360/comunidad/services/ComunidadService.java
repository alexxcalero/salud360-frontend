package pe.edu.pucp.salud360.comunidad.services;

import pe.edu.pucp.salud360.comunidad.dto.ComunidadDTO;

import java.util.List;

public interface ComunidadService {
    ComunidadDTO crearComunidad(ComunidadDTO dto);
    ComunidadDTO actualizarComunidad(Integer id, ComunidadDTO dto);
    boolean eliminarComunidad(Integer id);
    ComunidadDTO obtenerComunidadPorId(Integer id);
    List<ComunidadDTO> listarComunidades();
}
