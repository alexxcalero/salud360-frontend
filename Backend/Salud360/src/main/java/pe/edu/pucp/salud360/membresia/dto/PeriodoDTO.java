package pe.edu.pucp.salud360.membresia.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PeriodoDTO {
    private Integer idPeriodo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Integer cantReservas;
    private Integer idAfiliacion;
}