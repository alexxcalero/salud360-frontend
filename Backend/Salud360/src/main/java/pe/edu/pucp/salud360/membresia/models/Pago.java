package pe.edu.pucp.salud360.membresia.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.control.models.Reporte;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pago")
public class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPago;

    @Column(name = "monto", unique = false, nullable = false, updatable = true)
    private Double monto;

    @Column(name = "fechaPago", unique = false, nullable = false, updatable = true)
    private LocalDateTime fechaPago;

    @ManyToOne
    @JoinColumn(name = "idAfiliacion")
    private Afiliacion afiliacion;

    @ManyToMany(mappedBy = "pago")
    private List<Reporte> reportes;

    @ManyToOne
    @JoinColumn(name = "idMedioDePago")
    private MedioDePago medioDePago;
}
