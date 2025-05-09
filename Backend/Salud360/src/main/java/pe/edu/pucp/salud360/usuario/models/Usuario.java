package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuario")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUsuario", unique = true, nullable = false, updatable = false)
    protected Integer idUsuario;

    @Column(name = "nombres", unique = false, nullable = false, updatable = true)
    protected String nombres;

    @Column(name = "apellidos", unique = false, nullable = false, updatable = true)
    protected String apellidos;

    @Column(name = "numeroDocumento", unique = true, nullable = false, updatable = false)
    protected String numeroDocumento;  // Va a tener que contactar con el admin si quiere cambiar su numero de documento

    @Column(name = "correo", unique = true, nullable = false, updatable = true)
    protected String correo;

    @Column(name = "contrasenha", unique = false, nullable = false, updatable = true)
    protected String contrasenha;

    @Column(name = "fotoPerfil", unique = false, nullable = true, updatable = true)
    protected String fotoPerfil;

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    protected Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = false)
    protected LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = true, updatable = true)
    protected LocalDateTime fechaDesactivacion;

    @ManyToOne
    @JoinColumn(name = "idTipoDocumento", unique = false, nullable = false, updatable = true)
    protected TipoDocumento tipoDocumento;

    @ManyToOne
    @JoinColumn(name = "idRol", unique = false, nullable = false, updatable = true)
    protected Rol rol;
}
