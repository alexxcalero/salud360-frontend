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

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(nullable = false)
    private LocalDateTime horaInicio;

    @Column(nullable = false)
    private String estado;

    @Column(nullable = false)
    private Boolean activo;

    @Column(nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(nullable = false)
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

