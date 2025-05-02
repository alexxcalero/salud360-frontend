package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuario")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "telefono", unique = true, nullable = false, updatable = true)
    protected String telefono;

    @Column(name = "fechaNacimiento", unique = false, nullable = false, updatable = false)
    protected LocalDate fechaNacimiento;  // Va a tener que contactar con el admin si quiere cambiar su fecha de nacimiento

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    protected Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = false)
    protected LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = true, updatable = true)
    protected LocalDateTime fechaDesactivacion;

    @ManyToOne
    @JoinColumn(name = "idTipoDocumento")
    @JsonBackReference
    protected TipoDocumento tipoDocumento;

    @ManyToOne
    @JoinColumn(name = "idRol")
    protected Rol rol;

    public Usuario(Integer idUsuario, String nombres, String apellidos, String numeroDocumento, String correo, String contrasenha, String telefono, LocalDate fechaNacimiento, Boolean activo, TipoDocumento tipoDocumento, Rol rol) {
        this.idUsuario = idUsuario;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.numeroDocumento = numeroDocumento;
        this.correo = correo;
        this.contrasenha = contrasenha;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.activo = activo;
        this.tipoDocumento = tipoDocumento;
        this.rol = rol;
    }

    public Usuario(Integer idUsuario, String nombres, String apellidos, String numeroDocumento, String correo, String contrasenha, String telefono, LocalDate fechaNacimiento, Boolean activo) {
        this.idUsuario = idUsuario;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.numeroDocumento = numeroDocumento;
        this.correo = correo;
        this.contrasenha = contrasenha;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.activo = activo;
    }
}
