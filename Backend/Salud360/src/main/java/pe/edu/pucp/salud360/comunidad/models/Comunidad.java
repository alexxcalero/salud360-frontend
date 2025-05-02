package pe.edu.pucp.salud360.comunidad.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.membresia.models.Membresia;
import pe.edu.pucp.salud360.servicio.models.Servicio;
import pe.edu.pucp.salud360.usuario.models.Persona;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "comunidad")
public class Comunidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idComunidad;

    @Column(name = "nombre", unique = false, nullable = false, updatable = true)
    private String nombre;

    @Column(name = "descripcion", unique = false, nullable = false, updatable = true)
    private String descripcion;

    @Column(name = "proposito", unique = false, nullable = false, updatable = true)
    private String proposito;

    @ElementCollection
    @CollectionTable(name = "strings", joinColumns = @JoinColumn(name = "idComunidad"))
    @Column(name = "imagen")
    private List<String> imagen;

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    private Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaDesactivacion;

    @OneToMany(mappedBy = "comunidad")
    private List<Membresia> membresia;

    @OneToOne
    @JoinColumn(name = "idForo")
    private Foro foro;

    @OneToMany(mappedBy = "comunidad")
    private List<Testimonio> testimonios;

    @ManyToMany(mappedBy = "comunidad")
    private List<Servicio> servicios;

    @ManyToMany
    private List<Persona> persona;
}
