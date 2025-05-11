package pe.edu.pucp.salud360.usuario.dtos.permisoDTO;

import lombok.*;
import pe.edu.pucp.salud360.usuario.dtos.rolDTO.RolResumenDTO;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PermisoVistaAdminDTO {
    private Integer idPermiso;
    private String nombre;
    private String descripcion;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;
    private List<RolResumenDTO> roles;
}
