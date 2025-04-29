package pe.edu.pucp.salud360.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.usuario.models.Rol;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    protected Integer idUsuario;
    protected String nombres;
    protected String apellidos;
    protected String numeroDocumento;
    protected String correo;
    protected String contrasenha;
    protected String telefono;
    protected LocalDate fechaNacimiento;
    protected Boolean activo;
    protected TipoDocumento tipoDocumento;
    protected Rol rol;
}
