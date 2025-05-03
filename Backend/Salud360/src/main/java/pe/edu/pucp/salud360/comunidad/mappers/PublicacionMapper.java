package pe.edu.pucp.salud360.comunidad.mappers;

import pe.edu.pucp.salud360.comunidad.dto.PublicacionDTO;
import pe.edu.pucp.salud360.comunidad.models.Publicacion;
import pe.edu.pucp.salud360.comunidad.models.Foro;
import pe.edu.pucp.salud360.usuario.models.Persona;

public class PublicacionMapper {

    public static PublicacionDTO mapToDTO(Publicacion p) {
        if (p == null) return null;

        return new PublicacionDTO(
                p.getIdPublicacion(),
                p.getContenido(),
                p.getActivo(),
                p.getFechaCreacion(),
                p.getFechaDesactivacion(),
                p.getPersona() != null ? p.getPersona().getIdUsuario() : null,
                p.getForo()    != null ? p.getForo().getIdForo()           : null
        );
    }

    public static Publicacion mapToModel(PublicacionDTO dto,
                                         Persona persona,
                                         Foro foro) {
        if (dto == null) return null;

        Publicacion pub = new Publicacion();
        pub.setIdPublicacion(dto.getIdPublicacion());
        pub.setContenido(dto.getContenido());
        pub.setActivo(dto.getActivo());
        pub.setFechaCreacion(dto.getFechaCreacion());
        pub.setFechaDesactivacion(dto.getFechaDesactivacion());
        pub.setPersona(persona);
        pub.setForo(foro);
        // comentarios se gestionan aparte
        return pub;
    }
}
