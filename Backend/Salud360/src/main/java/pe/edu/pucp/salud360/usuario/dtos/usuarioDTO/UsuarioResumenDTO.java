package pe.edu.pucp.salud360.usuario.dtos.usuarioDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResumenDTO {
    Integer idUsuario;
    String nombres;
    String apellidos;
    String numeroDocumento;
    String correo;
}
