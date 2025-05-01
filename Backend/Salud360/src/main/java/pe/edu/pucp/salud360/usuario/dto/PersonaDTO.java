package pe.edu.pucp.salud360.usuario.dto;

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
import pe.edu.pucp.salud360.usuario.models.Notificacion;
import pe.edu.pucp.salud360.usuario.models.Rol;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonaDTO extends UsuarioDTO {
    private String fotoPerfil;
    private List<Comunidad> comunidades;
    private List<Afiliacion> afiliaciones;
    private List<MedioDePago> mediosDePago;
    private List<Publicacion> publicaciones;
    private List<Comentario> comentarios;
    private List<Testimonio> testimonios;
    private List<Clase> clases;
    private List<Notificacion> notificaciones;
    private List<Reserva> reservas;
    private List<CitaMedica> citasMedicas;

    public PersonaDTO(Integer idUsuario, String nombres, String apellidos, String numeroDocumento, String correo, String contrasenha, String telefono, LocalDate fechaNacimiento, Boolean activo, TipoDocumento tipoDocumento, Rol rol, String fotoPerfil) {
        super(idUsuario, nombres, apellidos, numeroDocumento, correo, contrasenha, telefono, fechaNacimiento, activo, tipoDocumento, rol);
        this.fotoPerfil = fotoPerfil;
    }

    public PersonaDTO(Integer idUsuario, String nombres, String apellidos, String numeroDocumento, String correo, String contrasenha, String telefono, LocalDate fechaNacimiento, Boolean activo, TipoDocumento tipoDocumento, Rol rol, String fotoPerfil, List<Comunidad> comunidades, List<Afiliacion> afiliaciones, List<MedioDePago> mediosDePago, List<Publicacion> publicaciones, List<Comentario> comentarios, List<Testimonio> testimonios, List<Clase> clases, List<Notificacion> notificaciones, List<Reserva> reservas, List<CitaMedica> citasMedicas) {
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
