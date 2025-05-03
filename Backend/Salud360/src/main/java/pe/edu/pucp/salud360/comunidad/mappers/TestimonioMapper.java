package pe.edu.pucp.salud360.comunidad.mappers;

import pe.edu.pucp.salud360.comunidad.dto.TestimonioDTO;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.comunidad.models.Testimonio;
import pe.edu.pucp.salud360.usuario.models.Persona;

public class TestimonioMapper {
    public static TestimonioDTO mapToDTO(Testimonio t) {
        if (t == null) return null;
        return new TestimonioDTO(
                t.getIdTestimonio(),
                t.getComentario(),
                t.getCalificacion(),
                t.getActivo(),
                t.getFechaCreacion(),
                t.getFechaDesactivacion(),
                t.getComunidad() != null ? t.getComunidad().getIdComunidad() : null,
                t.getPersona() != null ? t.getPersona().getIdUsuario() : null
        );
    }

    public static Testimonio mapToModel(TestimonioDTO dto, Comunidad comunidad, Persona persona) {
        if (dto == null) return null;
        Testimonio t = new Testimonio();
        t.setIdTestimonio(dto.getIdTestimonio());
        t.setComentario(dto.getComentario());
        t.setCalificacion(dto.getCalificacion());
        t.setActivo(dto.getActivo());
        t.setFechaCreacion(dto.getFechaCreacion());
        t.setFechaDesactivacion(dto.getFechaDesactivacion());
        t.setComunidad(comunidad);
        t.setPersona(persona);
        return t;
    }
}
