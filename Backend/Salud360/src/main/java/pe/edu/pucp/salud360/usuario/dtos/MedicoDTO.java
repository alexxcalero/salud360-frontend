package pe.edu.pucp.salud360.usuario.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;
import pe.edu.pucp.salud360.usuario.dtos.usuarioDTO.UsuarioDTO;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class MedicoDTO extends UsuarioDTO {
    private String especialidad;
    private String descripcion;
    private List<CitaMedica> citasMedicas;
}
