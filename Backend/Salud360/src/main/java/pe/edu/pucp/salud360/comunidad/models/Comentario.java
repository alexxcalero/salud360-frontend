package pe.edu.pucp.salud360.comunidad.models;

import jakarta.persistence.*;
import pe.edu.pucp.salud360.usuario.models.Persona;

import java.time.LocalDateTime;

@Entity
public class Comentario {
    @Id
    private int idComentario;

    private String contenido;
    private boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Persona usuario;

    @ManyToOne
    @JoinColumn(name = "publicacion_id")
    private Publicacion publicacion;
}
