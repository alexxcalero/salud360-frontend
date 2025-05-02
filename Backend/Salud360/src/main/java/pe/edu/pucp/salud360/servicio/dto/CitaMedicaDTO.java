package pe.edu.pucp.salud360.servicio.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CitaMedicaDTO {
    private Integer idCitaMedica;
    private LocalDate fecha;
    private LocalTime horaInicio;
    private String estado;
    private Boolean activo;

    private Integer idServicio;
    private Integer idUsuario;
    private Integer idMedico;
}

