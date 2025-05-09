package pe.edu.pucp.salud360.servicio.models;

import jakarta.persistence.*;
import lombok.*;

import pe.edu.pucp.salud360.usuario.models.Medico;
import pe.edu.pucp.salud360.usuario.models.Persona;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "citaMedica")
public class CitaMedica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCitaMedica;

    @Column(name = "fecha", unique = false, nullable = false, updatable = true)
    private LocalDate fecha;

    @Column(name = "horaInicio", unique = false, nullable = false, updatable = true)
    private LocalTime horaInicio;

    @Column(name = "estado", unique = false, nullable = false, updatable = true)
    private String estado;

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    private Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = true, updatable = true)
    private LocalDateTime fechaDesactivacion;

    @ManyToOne
    @JoinColumn(name = "idServicio")
    private Servicio servicio;

    @OneToMany(mappedBy = "citaMedica")
    private List<DocumentoMedico> documentosMedicos;

    @OneToMany(mappedBy = "citaMedica")
    private List<Reserva> reservas;

    @ManyToOne
    @JoinColumn(name = "idPersona")
    private Persona persona;

    @ManyToOne
    @JoinColumn(name = "idMedico")
    private Medico medico;
}
