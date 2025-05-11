package pe.edu.pucp.salud360.usuario.dtos.rolDTO;

import lombok.*;
import pe.edu.pucp.salud360.usuario.dtos.permisoDTO.PermisoResumenDTO;
import pe.edu.pucp.salud360.usuario.dtos.usuarioDTO.UsuarioResumenDTO;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RolVistaAdminDTO {
    private Integer idRol;
    private String nombre;
    private String descripcion;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;
    private List<UsuarioResumenDTO> usuarios;
    private List<PermisoResumenDTO> permisos;
}
