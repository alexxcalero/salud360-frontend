package pe.edu.pucp.salud360.usuario.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PermisoDTO {
    private Integer idPermiso;
    private String nombre;
    private String descripcion;
    private Boolean activo;
}
