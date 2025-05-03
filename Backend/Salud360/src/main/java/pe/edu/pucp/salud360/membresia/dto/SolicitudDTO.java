package pe.edu.pucp.salud360.membresia.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SolicitudDTO {
    private Integer idSolicitud;
    private Integer cantDias;
    private String estado;
    private Integer idAfiliacion;
}
