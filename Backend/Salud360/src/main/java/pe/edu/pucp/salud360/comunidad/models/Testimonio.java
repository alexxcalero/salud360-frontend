package pe.edu.pucp.salud360.comunidad.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.usuario.models.Persona;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "testimonio")
public class Testimonio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTestimonio;

    @Column(name = "comentario", unique = false, nullable = false, updatable = true)
    private String comentario;

    @Column(name = "calificacion", unique = false, nullable = false, updatable = true)
    private Double calificacion;

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    private Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaDesactivacion;

    @ManyToOne
    @JoinColumn(name = "idComunidad")
    private Comunidad comunidad;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Persona persona;
}
