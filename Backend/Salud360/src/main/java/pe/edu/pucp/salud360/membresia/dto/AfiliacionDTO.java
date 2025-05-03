package pe.edu.pucp.salud360.membresia.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AfiliacionDTO {
    private Integer idMembresia;
    private String estado;
    private LocalDateTime fechaAfiliacion;
    private LocalDateTime fechaDesafiliacion;
    private Integer maxReservas;
    private LocalDate fechaReactivacion;
    private Integer idMedioDePago;
    private Integer idUsuario;
    private List<Integer> idReporte;
}


