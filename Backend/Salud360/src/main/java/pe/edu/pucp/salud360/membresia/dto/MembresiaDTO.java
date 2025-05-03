package pe.edu.pucp.salud360.membresia.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MembresiaDTO {
    private Integer idMembresia;
    private String nombre;
    private String descripcion;
    private String tipo;
    private Boolean conTope;
    private Double precio;
    private Integer cantUsuarios;
    private String icono;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;
    private Integer idComunidad;
}
