package pe.edu.pucp.salud360.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.usuario.models.Permiso;
import pe.edu.pucp.salud360.usuario.models.Usuario;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RolDTO {
    private Integer idRol;
    private String nombre;
    private String descripcion;
    private Boolean activo;
    private List<Usuario> usuarios;
    private List<Permiso> permisos;
}
