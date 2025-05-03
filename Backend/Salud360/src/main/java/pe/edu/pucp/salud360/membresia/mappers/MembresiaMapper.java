package pe.edu.pucp.salud360.membresia.mappers;

import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.membresia.dto.MembresiaDTO;
import pe.edu.pucp.salud360.membresia.models.Membresia;

public class MembresiaMapper {
    public static MembresiaDTO mapToDTO(Membresia m) {
        if (m == null) return null;

        return new MembresiaDTO(
                m.getIdMembresia(),
                m.getNombre(),
                m.getDescripcion(),
                m.getTipo(),
                m.getConTope(),
                m.getPrecio(),
                m.getCantUsuarios(),
                m.getIcono(),
                m.getActivo(),
                m.getFechaCreacion(),
                m.getFechaDesactivacion(),
                m.getComunidad() != null ? m.getComunidad().getIdComunidad() : null
        );
    }

    public static Membresia mapToModel(MembresiaDTO dto, Comunidad comunidad) {
        if (dto == null) return null;

        Membresia m = new Membresia();
        m.setIdMembresia(dto.getIdMembresia());
        m.setNombre(dto.getNombre());
        m.setDescripcion(dto.getDescripcion());
        m.setTipo(dto.getTipo());
        m.setConTope(dto.getConTope());
        m.setPrecio(dto.getPrecio());
        m.setCantUsuarios(dto.getCantUsuarios());
        m.setIcono(dto.getIcono());
        m.setActivo(dto.getActivo());
        m.setFechaCreacion(dto.getFechaCreacion());
        m.setFechaDesactivacion(dto.getFechaDesactivacion());
        m.setComunidad(comunidad);
        return m;
    }
}
