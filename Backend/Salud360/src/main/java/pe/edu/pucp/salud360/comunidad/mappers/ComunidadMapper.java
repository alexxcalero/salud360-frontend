package pe.edu.pucp.salud360.comunidad.mappers;

import pe.edu.pucp.salud360.comunidad.dto.ComunidadDTO;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.comunidad.models.Foro;

public class ComunidadMapper {
    public static ComunidadDTO mapToDTO(Comunidad comunidad) {
        if (comunidad == null) return null;

        return new ComunidadDTO(
                comunidad.getIdComunidad(),
                comunidad.getNombre(),
                comunidad.getDescripcion(),
                comunidad.getProposito(),
                comunidad.getImagen(),
                comunidad.getActivo(),
                comunidad.getFechaCreacion(),
                comunidad.getFechaDesactivacion(),
                comunidad.getForo() != null ? comunidad.getForo().getIdForo() : null
        );
    }

    public static Comunidad mapToModel(ComunidadDTO dto, Foro foro) {
        Comunidad comunidad = new Comunidad();
        comunidad.setIdComunidad(dto.getIdComunidad());
        comunidad.setNombre(dto.getNombre());
        comunidad.setDescripcion(dto.getDescripcion());
        comunidad.setProposito(dto.getProposito());
        comunidad.setImagen(dto.getImagen());
        comunidad.setActivo(dto.getActivo());
        comunidad.setFechaCreacion(dto.getFechaCreacion());
        comunidad.setFechaDesactivacion(dto.getFechaDesactivacion());
        comunidad.setForo(foro);
        return comunidad;
    }
}
