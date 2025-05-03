package pe.edu.pucp.salud360.control.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReporteDTO {
    private Integer idReporte;
    private LocalDateTime fechaCreacion;
    private List<Integer> idAfiliaciones;
    private List<Integer> idPagos;
}

