package pe.edu.pucp.salud360.servicio.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "citamedica")
public class CitaMedica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCitaMedica;

    @Column(name = "fecha", unique = false, nullable = false, updatable = true)
    private LocalDateTime fecha;

    @Column(name = "horaInicio", unique = false, nullable = false, updatable = true)
    private LocalDateTime horaInicio;

    @Column(name = "estado", unique = false, nullable = false, updatable = true)
    private String estado;

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    private Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaDesactivacion;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Persona usuario;

    @ManyToOnes
    @JoinColumn(name = "idServicio")
    private Servicio servicio;

    @OneToOne(mappedBy = "citamedica")
    private Reserva reserva;

    @OneToMany(mappedBy = "citaMedica")
    private List<DocumentoMedico> documentosMedicos;
}

