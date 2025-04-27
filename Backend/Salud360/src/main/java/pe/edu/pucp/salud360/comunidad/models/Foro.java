package pe.edu.pucp.salud360.comunidad.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Foro {
    @Id
    private int idForo;

    private String titulo;
    private String descripcion;
    private int cantPublicaciones;
    private boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;

    @OneToMany(mappedBy = "foro")
    private List<Publicacion> publicaciones;

    @OneToOne
    @JoinColumn(name = "idComunidad")
    private Comunidad comunidad;
}
