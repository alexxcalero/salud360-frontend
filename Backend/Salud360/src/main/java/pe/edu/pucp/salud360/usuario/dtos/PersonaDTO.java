package pe.edu.pucp.salud360.usuario.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pe.edu.pucp.salud360.comunidad.models.Comentario;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.comunidad.models.Publicacion;
import pe.edu.pucp.salud360.comunidad.models.Testimonio;
import pe.edu.pucp.salud360.membresia.models.Afiliacion;
import pe.edu.pucp.salud360.membresia.models.MedioDePago;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;
import pe.edu.pucp.salud360.servicio.models.Clase;
import pe.edu.pucp.salud360.servicio.models.Reserva;
import pe.edu.pucp.salud360.usuario.dtos.usuarioDTO.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.models.Notificacion;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PersonaDTO extends UsuarioDTO {
    private String telefono;
    private LocalDate fechaNacimiento;
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
}
