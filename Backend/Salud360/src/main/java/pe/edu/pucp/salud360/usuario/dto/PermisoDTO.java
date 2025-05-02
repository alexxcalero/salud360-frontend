package pe.edu.pucp.salud360.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.usuario.models.Rol;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PermisoDTO {
    private Integer idPermiso;
    private String nombre;
    private String descripcion;
    private Boolean activo;
    private List<Rol> roles;
}
