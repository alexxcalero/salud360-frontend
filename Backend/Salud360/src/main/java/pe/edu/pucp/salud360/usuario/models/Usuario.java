package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
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

    @Column(name = "numeroDocumento", unique = true, nullable = false, updatable = true)
    protected String numeroDocumento;

    @Column(name = "correo", unique = true, nullable = false, updatable = true)
    protected String correo;

    @Column(name = "contrasenha", unique = false, nullable = false, updatable = true)
    protected String contrasenha;

    @Column(name = "telefono", unique = true, nullable = false, updatable = true)
    protected String telefono;

    @Column(name = "sexo", unique = false, nullable = false, updatable = true)
    protected String sexo;

    @Column(name = "fotoPerfil", unique = false, nullable = true, updatable = true)
    protected String fotoPerfil;

    @Column(name = "fechaNacimiento", unique = false, nullable = false, updatable = true)
    protected LocalDate fechaNacimiento;

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
