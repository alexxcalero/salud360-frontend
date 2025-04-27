package pe.edu.pucp.salud360.usuario.models;

import pe.edu.pucp.salud360.comunidad.models.Comentario;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.comunidad.models.Publicacion;
import pe.edu.pucp.salud360.comunidad.models.Testimonio;
import pe.edu.pucp.salud360.membresia.models.Afiliacion;
import pe.edu.pucp.salud360.membresia.models.MedioDePago;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;
import pe.edu.pucp.salud360.servicio.models.Clase;
import pe.edu.pucp.salud360.servicio.models.Reserva;

import java.util.List;

public class Persona extends Usuario {
    private String fotoPerfil;

    private List<Comunidad> comunidades;
    private List<Afiliacion> afiliaciones;
    private List<MedioDePago> mediosDePago;
    private List<Publicacion> publicaciones;
    private List<Comentario> comentarios;
    private List<Testimonio> testimonios;

    private List<Clase> clases;
    private List<CitaMedica> citasMedicas;
    private List<Reserva> reservas;
    private List<Notificacion> notificaciones;
}
