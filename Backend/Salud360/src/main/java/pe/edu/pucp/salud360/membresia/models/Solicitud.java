package pe.edu.pucp.salud360.membresia.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "solicitud")
public class Solicitud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSolicitud;

    @Column(name = "cantDias", unique = false, nullable = false, updatable = true)
    private Integer cantDias;

    @Column(name = "estado", unique = false, nullable = false, updatable = true)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "afiliacion")
    private Afiliacion afiliacion;
}
