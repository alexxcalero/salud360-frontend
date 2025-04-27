package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.servicio.models.Reserva;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notificacion")
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idNotificacion;

    @Column(name = "mensaje", unique = false, nullable = false, updatable = true)
    private String mensaje;


    @Column(name = "tipo", unique = false, nullable = false, updatable = true)
    private String tipo;

    @Column(name = "fecha", unique = false, nullable = false, updatable = true)
    private LocalDateTime fecha;

    @Column(name = "fechaEnvio", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaEnvio;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Persona usuario;

    @ManyToOne
    @JoinColumn(name = "idReserva")
    private Reserva reserva;
}
