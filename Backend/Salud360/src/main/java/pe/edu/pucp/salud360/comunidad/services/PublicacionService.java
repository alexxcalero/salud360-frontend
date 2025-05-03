package pe.edu.pucp.salud360.comunidad.services;

import pe.edu.pucp.salud360.comunidad.dto.PublicacionDTO;

import java.util.List;

public interface PublicacionService {
    PublicacionDTO crearPublicacion(PublicacionDTO publicacionDTO);
    List<PublicacionDTO> listarPublicaciones();
    PublicacionDTO obtenerPublicacionPorId(Integer id);
    PublicacionDTO actualizarPublicacion(Integer id, PublicacionDTO publicacionDTO);
    boolean eliminarPublicacion(Integer id);
}
