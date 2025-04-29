package pe.edu.pucp.salud360.servicio.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.usuario.models.Persona;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clase")
public class Clase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idClase;

    @Column(name = "nombre", unique = false, nullable = false, updatable = true)
    private String nombre;

    @Column(name = "descripcion", unique = false, nullable = false, updatable = true)
    private String descripcion;

    @Column(name = "fechaClase", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaClase;

    @Column(name = "horaInicio", unique = false, nullable = false, updatable = true)
    private LocalDateTime horaInicio;

    @Column(name = "horaFin", unique = false, nullable = false, updatable = true)
    private LocalDateTime horaFin;

    @Column(name = "capacidad", unique = false, nullable = false, updatable = true)
    private Integer capacidad;

    @Column(name = "cantAsistentes", unique = false, nullable = false, updatable = true)
    private Integer cantAsistentes;

    @Column(name = "estado", unique = false, nullable = false, updatable = true)
    private String estado;

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    private Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = true, updatable = true)
    private LocalDateTime fechaDesactivacion;

    @ManyToMany
    @JoinTable(
            name = "claseXpersona",
            joinColumns = @JoinColumn(name = "idClase"),
            inverseJoinColumns = @JoinColumn(name = "idUsuario")
    )
    private List<Persona> personas;

    @OneToMany(mappedBy = "clase")
    private List<Reserva> reservas;

    @ManyToOne
    @JoinColumn(name = "idLocal")
    private Local local;
}
