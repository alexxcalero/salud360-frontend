package pe.edu.pucp.salud360.comunidad.models;

<<<<<<< HEAD
public class Testimonio {
=======
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import pe.edu.pucp.salud360.usuario.models.Persona;

import java.time.LocalDateTime;

@Entity
public class Testimonio {
    @Id
    private int idTestimonio;

    private String comentario;
    private double calificacion;
    private boolean activo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaDesactivacion;

    @ManyToOne
    @JoinColumn(name = "idComunidad")
    private Comunidad comunidad;

    @ManyToOne
    @JoinColumn(name = "idPersona")
    private Persona usuario;
>>>>>>> a2492f769097a3ed8a8e52c222a7a1e754798669
}
