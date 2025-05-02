package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.comunidad.models.Comentario;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.comunidad.models.Publicacion;
import pe.edu.pucp.salud360.comunidad.models.Testimonio;
import pe.edu.pucp.salud360.membresia.models.Afiliacion;
import pe.edu.pucp.salud360.membresia.models.MedioDePago;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;
import pe.edu.pucp.salud360.servicio.models.Clase;
import pe.edu.pucp.salud360.servicio.models.Reserva;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "persona")
@PrimaryKeyJoinColumn(name = "idUsuario")
public class Persona extends Usuario {
    @Column(name = "fotoPerfil", unique = false, nullable = false, updatable = true)
    private String fotoPerfil;

    @ManyToMany(mappedBy = "persona")
    private List<Comunidad> comunidades;

    @OneToMany(mappedBy = "persona")
    private List<Afiliacion> afiliaciones;

    @OneToMany(mappedBy = "persona")
    private List<MedioDePago> mediosDePago;

    @OneToMany(mappedBy = "persona")
    private List<Publicacion> publicaciones;

    @OneToMany(mappedBy = "persona")
    private List<Comentario> comentarios;

    @OneToMany(mappedBy = "persona")
    private List<Testimonio> testimonios;

    @ManyToMany(mappedBy = "personas")
    private List<Clase> clases;

    @OneToMany(mappedBy = "usuario")
    private List<Notificacion> notificaciones;

    @OneToMany(mappedBy = "persona")
    private List<Reserva> reservas;

    @OneToMany(mappedBy = "persona")
    private List<CitaMedica> citasMedicas;

    public Persona(Integer idUsuario, String nombres, String apellidos, String numeroDocumento, String correo, String contrasenha, String telefono, LocalDate fechaNacimiento, Boolean activo, TipoDocumento tipoDocumento, Rol rol, String fotoPerfil) {
        super(idUsuario, nombres, apellidos, numeroDocumento, correo, contrasenha, telefono, fechaNacimiento, activo, tipoDocumento, rol);
        this.fotoPerfil = fotoPerfil;
    }

    public Persona(Integer idUsuario, String nombres, String apellidos, String numeroDocumento, String correo, String contrasenha, String telefono, LocalDate fechaNacimiento, Boolean activo, TipoDocumento tipoDocumento, Rol rol, String fotoPerfil, List<Comunidad> comunidades, List<Afiliacion> afiliaciones, List<MedioDePago> mediosDePago, List<Publicacion> publicaciones, List<Comentario> comentarios, List<Testimonio> testimonios, List<Clase> clases, List<Notificacion> notificaciones, List<Reserva> reservas, List<CitaMedica> citasMedicas) {
        super(idUsuario, nombres, apellidos, numeroDocumento, correo, contrasenha, telefono, fechaNacimiento, activo, tipoDocumento, rol);
        this.fotoPerfil = fotoPerfil;
        this.comunidades = comunidades;
        this.afiliaciones = afiliaciones;
        this.mediosDePago = mediosDePago;
        this.publicaciones = publicaciones;
        this.comentarios = comentarios;
        this.testimonios = testimonios;
        this.clases = clases;
        this.notificaciones = notificaciones;
        this.reservas = reservas;
        this.citasMedicas = citasMedicas;
    }
}
