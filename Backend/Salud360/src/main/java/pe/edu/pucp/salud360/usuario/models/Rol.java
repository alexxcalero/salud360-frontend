package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRol;

    @Column(name = "nombre", unique = false, nullable = false, updatable = true)
    private String nombre;

    @Column(name = "descripcion", unique = false, nullable = false, updatable = true)
    private String descripcion;

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    private Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = true, updatable = true)
    private LocalDateTime fechaDesactivacion;

    @OneToMany(mappedBy = "rol")
    private List<Usuario> usuarios;

    @ManyToMany
    @JoinTable(
            name = "rolXpermiso",
            joinColumns = @JoinColumn(name = "idRol"),
            inverseJoinColumns = @JoinColumn(name = "idPermiso")
    )
    private List<Permiso> permisos;

    public Rol(Integer idRol, String nombre, String descripcion, Boolean activo, List<Usuario> usuarios, List<Permiso> permisos) {
        this.idRol = idRol;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.activo = activo;
        this.usuarios = usuarios;
        this.permisos = permisos;
    }
}
