package pe.edu.pucp.salud360.comunidad.mappers;

import pe.edu.pucp.salud360.comunidad.dto.ComentarioDTO;
import pe.edu.pucp.salud360.comunidad.models.Comentario;
import pe.edu.pucp.salud360.comunidad.models.Publicacion;
import pe.edu.pucp.salud360.usuario.models.Persona;

public class ComentarioMapper {

    public static ComentarioDTO mapToDTO(Comentario comentario) {
        if (comentario == null) return null;

        return new ComentarioDTO(
                comentario.getIdComentario(),
                comentario.getContenido(),
                comentario.getActivo(),
                comentario.getFechaCreacion(),
                comentario.getFechaDesactivacion(),
                comentario.getPersona() != null ? comentario.getPersona().getIdUsuario() : null,
                comentario.getPublicacion() != null ? comentario.getPublicacion().getIdPublicacion() : null
        );
    }

    public static Comentario mapToModel(ComentarioDTO dto, Persona persona, Publicacion publicacion) {
        if (dto == null) return null;

        Comentario comentario = new Comentario();
        comentario.setIdComentario(dto.getIdComentario());
        comentario.setContenido(dto.getContenido());
        comentario.setActivo(dto.getActivo());
        comentario.setFechaCreacion(dto.getFechaCreacion());
        comentario.setFechaDesactivacion(dto.getFechaDesactivacion());
        comentario.setPersona(persona);
        comentario.setPublicacion(publicacion);
        return comentario;
    }
}

