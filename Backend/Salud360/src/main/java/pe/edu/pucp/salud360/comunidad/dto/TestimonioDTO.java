package pe.edu.pucp.salud360.comunidad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TestimonioDTO {
    private Integer idTestimonio;
    private String comentario;
    private Double calificacion;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;
    private Integer idComunidad;
    private Integer idUsuario;
}
