package pe.edu.pucp.salud360.servicio.dto;

import lombok.*;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;
import pe.edu.pucp.salud360.servicio.models.Local;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServicioDTO {
    private Integer idServicio;
    private String nombre;
    private String descripcion;
    private List<String> imagenes;
    private String tipo;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;
    private List<Comunidad> comunidad;
    private List<CitaMedica> citasMedicas;
    private List<Local> locales;
}
