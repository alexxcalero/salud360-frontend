package pe.edu.pucp.salud360.comunidad.models;

import jakarta.persistence.*;
import pe.edu.pucp.salud360.servicio.models.Servicio;
import pe.edu.pucp.salud360.usuario.models.Persona;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Comunidad {
    @Id
    private int idComunidad;

    private String nombre;
    private String descripcion;
    private String proposito;

    @ElementCollection
    @CollectionTable(name = "strings", joinColumns = @JoinColumn(name = "idComunidad"))
    @Column(name = "imagen")
    private List<String> imagen;

    private boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;

    @OneToMany(mappedBy = "comunidad")
    private List<Comentario> membresia;

    @OneToOne
    @JoinColumn(name = "idForo")
    private Foro foro;

    @OneToMany(mappedBy = "comunidad")
    private List<Testimonio> testimonios;

    @ManyToMany(mappedBy = "comunidades")
    private List<Servicio> servicios;

    @ManyToMany
    private List<Persona> usuarios;
}
