package pe.edu.pucp.salud360.usuario.dto;

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
public class UsuarioDTO {
    protected Integer idUsuario;
    protected String nombres;
    protected String apellidos;
    protected String numeroDocumento;
    protected String correo;
    protected String contrasenha;
    protected String fotoPefil;
    protected Boolean activo;
    protected TipoDocumentoDTO tipoDocumento;
    protected RolDTO rol;
}
