package pe.edu.pucp.salud360.usuario.dtos.tipoDocumentoDTO;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TipoDocumentoVistaAdminDTO {
    private Integer idTipoDocumento;
    private String nombre;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;
}
