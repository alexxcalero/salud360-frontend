package pe.edu.pucp.salud360.servicio.mappers;

import pe.edu.pucp.salud360.servicio.dto.CitaMedicaDTO;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;
import pe.edu.pucp.salud360.servicio.models.Servicio;
import pe.edu.pucp.salud360.usuario.models.Medico;
import pe.edu.pucp.salud360.usuario.models.Persona;

public class CitaMedicaMapper {

    public static CitaMedicaDTO mapToDTO(CitaMedica c) {
        if (c == null) return null;

        return new CitaMedicaDTO(
                c.getIdCitaMedica(),
                c.getFecha(),
                c.getHoraInicio(),
                c.getEstado(),
                c.getActivo(),
                c.getServicio() != null ? c.getServicio().getIdServicio() : null,
                c.getUsuario() != null ? c.getUsuario().getIdUsuario() : null,
                c.getMedico() != null ? c.getMedico().getIdUsuario() : null
        );
    }

    public static CitaMedica mapToModel(CitaMedicaDTO dto, Servicio servicio, Persona usuario, Medico medico) {
        if (dto == null) return null;

        CitaMedica cita = new CitaMedica();
        cita.setIdCitaMedica(dto.getIdCitaMedica());
        cita.setFecha(dto.getFecha());
        cita.setHoraInicio(dto.getHoraInicio());
        cita.setEstado(dto.getEstado());
        cita.setActivo(dto.getActivo());
        cita.setServicio(servicio);
        cita.setUsuario(usuario);
        cita.setMedico(medico);
        return cita;
    }
}
