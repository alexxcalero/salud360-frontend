package pe.edu.pucp.salud360.membresia.services;

import pe.edu.pucp.salud360.membresia.dto.AfiliacionDTO;

import java.util.List;

public interface AfiliacionService {
    AfiliacionDTO crearAfiliacion(AfiliacionDTO dto);
    List<AfiliacionDTO> listarAfiliaciones();
    boolean eliminarAfiliacion(Integer id);
    AfiliacionDTO buscarAfiliacionPorId(Integer id);
    AfiliacionDTO actualizarAfiliacion(Integer id, AfiliacionDTO dto);
}

