package pe.edu.pucp.salud360.usuario.dtos.permisoDTO;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PermisoResumenDTO {
    private Integer idPermiso;
    private String nombre;
    private String descripcion;
}
