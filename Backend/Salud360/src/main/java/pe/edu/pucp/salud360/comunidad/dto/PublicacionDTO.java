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
public class PublicacionDTO {
    private Integer idPublicacion;
    private String contenido;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;
    private Integer idUsuario;  // referencia a Persona
    private Integer idForo;     // referencia a Foro
}
