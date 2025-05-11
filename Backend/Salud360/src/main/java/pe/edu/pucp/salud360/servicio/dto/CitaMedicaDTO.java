package pe.edu.pucp.salud360.servicio.dto;

import lombok.*;
import pe.edu.pucp.salud360.usuario.dtos.MedicoDTO;
import pe.edu.pucp.salud360.usuario.dtos.PersonaDTO;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CitaMedicaDTO {
    private Integer idCitaMedica;
    private LocalDate fecha;
    private LocalTime horaInicio;
    private String estado;
    private Boolean activo;
    private ServicioDTO servicio;
    private PersonaDTO persona;
    private MedicoDTO medico;
}
