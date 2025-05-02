package pe.edu.pucp.salud360.comunidad.models;

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
@Table(name = "publicacion")
public class Publicacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPublicacion;

    @Column(name = "contenido", unique = false, nullable = false, updatable = true)
    private String contenido;

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    private Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaDesactivacion;

    @OneToMany(mappedBy = "publicacion")
    private List<Comentario> comentarios;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Persona persona;

    @ManyToOne
    @JoinColumn(name = "idForo")
    private Foro foro;
}
