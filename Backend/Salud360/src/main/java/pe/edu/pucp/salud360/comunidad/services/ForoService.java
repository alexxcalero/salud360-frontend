package pe.edu.pucp.salud360.comunidad.services;


import pe.edu.pucp.salud360.comunidad.dto.ForoDTO;

import java.util.List;

public interface ForoService {
    ForoDTO crearForo(ForoDTO dto);
    ForoDTO actualizarForo(Integer id, ForoDTO dto);
    boolean eliminarForo(Integer id);
    ForoDTO buscarPorId(Integer id);
    List<ForoDTO> listarTodos();
}
