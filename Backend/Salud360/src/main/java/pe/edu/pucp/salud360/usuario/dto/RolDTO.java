package pe.edu.pucp.salud360.usuario.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RolDTO {
    private Integer idRol;
    private String nombre;
    private String descripcion;
    private Boolean activo;
    private List<PermisoDTO> permisos;
}
