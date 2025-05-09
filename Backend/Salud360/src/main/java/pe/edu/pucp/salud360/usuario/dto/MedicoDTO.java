package pe.edu.pucp.salud360.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;

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
