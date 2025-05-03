package pe.edu.pucp.salud360.control.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuditoriaDTO {
    private Integer idAuditoria;
    private String nombreTabla;
    private LocalDateTime fechaModificacion;
    private Integer idUsuarioModificador;
    private String descripcion;
}


