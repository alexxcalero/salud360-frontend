package pe.edu.pucp.salud360.usuario.dtos.usuarioDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pe.edu.pucp.salud360.usuario.dtos.rolDTO.RolVistaClienteDTO;
import pe.edu.pucp.salud360.usuario.dtos.tipoDocumentoDTO.TipoDocumentoVistaClienteDTO;

import java.time.LocalDate;

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
    protected String telefono;
    protected String sexo;
    protected String fotoPefil;
    protected LocalDate fechaNacimiento;
    protected Boolean activo;
    protected TipoDocumentoVistaClienteDTO tipoDocumento;
    protected RolVistaClienteDTO rol;
}
