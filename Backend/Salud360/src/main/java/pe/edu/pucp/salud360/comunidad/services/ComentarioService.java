package pe.edu.pucp.salud360.comunidad.services;

import pe.edu.pucp.salud360.comunidad.dto.ComentarioDTO;

import java.util.List;

public interface ComentarioService {
    ComentarioDTO crearComentario(ComentarioDTO comentarioDTO);
    ComentarioDTO actualizarComentario(Integer idComentario, ComentarioDTO comentarioDTO);
    boolean eliminarComentario(Integer idComentario);
    ComentarioDTO buscarComentarioPorId(Integer idComentario);
    List<ComentarioDTO> listarComentarios();
}

