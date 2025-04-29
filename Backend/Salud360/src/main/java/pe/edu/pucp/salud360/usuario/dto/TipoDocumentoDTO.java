package pe.edu.pucp.salud360.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.usuario.models.Usuario;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TipoDocumentoDTO {
    private Integer idTipoDocumento;
    private String nombre;
    private Boolean activo;
    private List<Usuario> usuarios;
}
