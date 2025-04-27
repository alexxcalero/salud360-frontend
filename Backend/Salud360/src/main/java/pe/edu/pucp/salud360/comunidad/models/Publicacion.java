package pe.edu.pucp.salud360.comunidad.models;

import jakarta.persistence.*;
import pe.edu.pucp.salud360.usuario.models.Persona;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Publicacion {
    @Id
    private int idPublicacion;

    private String contenido;
    private boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;

    @OneToMany(mappedBy = "publicacion")
    private List<Comentario> comentarios;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Persona usuario;

    @ManyToOne
    @JoinColumn(name = "idForo")
    private Foro foro;
}
