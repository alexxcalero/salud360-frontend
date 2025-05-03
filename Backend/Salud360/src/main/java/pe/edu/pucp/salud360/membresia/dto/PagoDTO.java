package pe.edu.pucp.salud360.membresia.dto;

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
public class PagoDTO {
    private Integer idPago;
    private Double monto;
    private LocalDateTime fechaPago;
    private Integer idAfiliacion;
    private Integer idMedioDePago;
}

