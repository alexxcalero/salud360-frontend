package pe.edu.pucp.salud360.usuario.dtos.tipoDocumentoDTO;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TipoDocumentoVistaClienteDTO {
    private Integer idTipoDocumento;
    private String nombre;
}
