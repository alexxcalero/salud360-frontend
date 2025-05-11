package pe.edu.pucp.salud360.usuario.dtos.rolDTO;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RolResumenDTO {
    private Integer idRol;
    private String nombre;
    private String descripcion;
}
