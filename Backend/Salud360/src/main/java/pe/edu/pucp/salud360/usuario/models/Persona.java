package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.*;

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

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "persona")
@PrimaryKeyJoinColumn(name = "idUsuario")
public class Persona extends Usuario {
    @Column(name = "telefono", unique = true, nullable = false, updatable = true)
    protected String telefono;

    @Column(name = "fechaNacimiento", unique = false, nullable = false, updatable = false)
    protected LocalDate fechaNacimiento;  // Va a tener que contactar con el admin si quiere cambiar su fecha de nacimiento

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
}
