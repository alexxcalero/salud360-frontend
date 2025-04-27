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
    private Integer idUsuario;

    @Column(name = "nombres", unique = false, nullable = false, updatable = true)
    private String nombres;

    @Column(name = "apellidos", unique = false, nullable = false, updatable = true)
    private String apellidos;

    @Column(name = "numeroDocumento", unique = true, nullable = false, updatable = false)
    private String numeroDocumento;  // Va a tener que contactar con el admin si quiere cambiar su numero de documento

    @Column(name = "correo", unique = true, nullable = false, updatable = true)
    private String correo;

    @Column(name = "contrasenha", unique = false, nullable = false, updatable = true)
    private String contrasenha;

    @Column(name = "telefono", unique = true, nullable = false, updatable = true)
    private String telefono;

    @Column(name = "fechaNacimiento", unique = false, nullable = false, updatable = false)
    private LocalDate fechaNacimiento;  // Va a tener que contactar con el admin si quiere cambiar su fecha de nacimiento

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    private Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = true, updatable = true)
    private LocalDateTime fechaDesactivacion;

    @ManyToOne
    @JoinColumn(name = "idTipoDocumento")
    private TipoDocumento tipoDocumento;

    @ManyToOne
    @JoinColumn(name = "idRol")
    private Rol rol;
}
