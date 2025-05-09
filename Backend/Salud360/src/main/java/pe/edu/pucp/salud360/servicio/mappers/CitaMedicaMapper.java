package pe.edu.pucp.salud360.servicio.mappers;

import pe.edu.pucp.salud360.servicio.dto.CitaMedicaDTO;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;
import pe.edu.pucp.salud360.servicio.models.Servicio;
import pe.edu.pucp.salud360.usuario.models.Medico;
import pe.edu.pucp.salud360.usuario.models.Persona;

public class CitaMedicaMapper {

    public static CitaMedicaDTO mapToDTO(CitaMedica c) {
        if (c == null) return null;

        return CitaMedicaDTO.builder()
                .idCitaMedica(c.getIdCitaMedica())
                .fecha(c.getFecha())
                .horaInicio(c.getHoraInicio())
                .estado(c.getEstado())
                .activo(c.getActivo())
                .build();
    }

    public static CitaMedica mapToModel(CitaMedicaDTO dto, Servicio servicio, Persona usuario, Medico medico) {
        if (dto == null) return null;

        return CitaMedica.builder()
                .idCitaMedica(dto.getIdCitaMedica())
                .fecha(dto.getFecha())
                .horaInicio(dto.getHoraInicio())
                .estado(dto.getEstado())
                .activo(dto.getActivo())
                .servicio(servicio)
                .persona(usuario)
                .medico(medico)
                .build();
    }
}
