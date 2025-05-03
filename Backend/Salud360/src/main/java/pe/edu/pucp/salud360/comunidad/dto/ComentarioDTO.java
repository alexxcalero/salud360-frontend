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
public class ComentarioDTO {
    private Integer idComentario;
    private String contenido;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;
    private Integer idPersona;      // ID del usuario que comentó
    private Integer idPublicacion;  // ID de la publicación relacionada
}

