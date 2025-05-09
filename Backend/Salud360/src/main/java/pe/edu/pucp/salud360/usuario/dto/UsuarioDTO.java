package pe.edu.pucp.salud360.usuario.dto;

import lombok.*;

@Getter
@Setter
@Builder
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
