package pe.edu.pucp.salud360.membresia.mappers;


import pe.edu.pucp.salud360.membresia.dto.MedioDePagoDTO;
import pe.edu.pucp.salud360.membresia.models.MedioDePago;
import pe.edu.pucp.salud360.usuario.models.Persona;

public class MedioDePagoMapper {

    public static MedioDePagoDTO mapToDTO(MedioDePago m) {
        if (m == null) return null;

        return new MedioDePagoDTO(
                m.getIdMedioDePago(),
                m.getTipo(),
                m.getActivo(),
                m.getFechaCreacion(),
                m.getFechaDesactivacion(),
                m.getPersona() != null ? m.getPersona().getIdUsuario() : null
        );
    }

    public static MedioDePago mapToModel(MedioDePagoDTO dto, Persona persona) {
        MedioDePago m = new MedioDePago();
        m.setIdMedioDePago(dto.getIdMedioDePago());
        m.setTipo(dto.getTipo());
        m.setActivo(dto.getActivo());
        m.setFechaCreacion(dto.getFechaCreacion());
        m.setFechaDesactivacion(dto.getFechaDesactivacion());
        m.setPersona(persona);
        return m;
    }
}
