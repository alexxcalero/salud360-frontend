package pe.edu.pucp.salud360.comunidad.mappers;

import pe.edu.pucp.salud360.comunidad.dto.ForoDTO;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.comunidad.models.Foro;

public class ForoMapper {

    public static ForoDTO mapToDTO(Foro foro) {
        if (foro == null) return null;

        return new ForoDTO(
                foro.getIdForo(),
                foro.getTitulo(),
                foro.getDescripcion(),
                foro.getCantPublicaciones(),
                foro.getActivo(),
                foro.getFechaCreacion(),
                foro.getFechaDesactivacion(),
                foro.getComunidad() != null ? foro.getComunidad().getIdComunidad() : null
        );
    }

    public static Foro mapToModel(ForoDTO dto, Comunidad comunidad) {
        if (dto == null) return null;

        Foro foro = new Foro();
        foro.setIdForo(dto.getIdForo());
        foro.setTitulo(dto.getTitulo());
        foro.setDescripcion(dto.getDescripcion());
        foro.setCantPublicaciones(dto.getCantPublicaciones());
        foro.setActivo(dto.getActivo());
        foro.setFechaCreacion(dto.getFechaCreacion());
        foro.setFechaDesactivacion(dto.getFechaDesactivacion());
        foro.setComunidad(comunidad);
        return foro;
    }
}

