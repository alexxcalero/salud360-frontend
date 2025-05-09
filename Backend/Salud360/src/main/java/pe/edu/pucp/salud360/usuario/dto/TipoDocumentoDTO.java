package pe.edu.pucp.salud360.usuario.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TipoDocumentoDTO {
    private Integer idTipoDocumento;
    private String nombre;
    private Boolean activo;
}
