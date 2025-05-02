package pe.edu.pucp.salud360.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;
import pe.edu.pucp.salud360.usuario.models.Rol;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicoDTO extends UsuarioDTO {
    private String especialidad;
    private String descripcion;
    private List<CitaMedica> citasMedicas;

    public MedicoDTO(Integer idUsuario, String nombres, String apellidos, String numeroDocumento, String correo, String contrasenha, String telefono, LocalDate fechaNacimiento, Boolean activo, TipoDocumento tipoDocumento, Rol rol, String especialidad, String descripcion, List<CitaMedica> citasMedicas) {
        super(idUsuario, nombres, apellidos, numeroDocumento, correo, contrasenha, telefono, fechaNacimiento, activo, tipoDocumento, rol);
        this.especialidad = especialidad;
        this.descripcion = descripcion;
        this.citasMedicas = citasMedicas;
    }
}
