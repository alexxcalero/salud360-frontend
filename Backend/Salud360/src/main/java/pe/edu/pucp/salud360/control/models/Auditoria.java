package pe.edu.pucp.salud360.control.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Auditoria")
public class Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAuditoria;

    @Column(name = "nombreTabla", unique = false, nullable = false, updatable = false)
    private String nombreTabla;

    @Column(name = "fechaModificacion", unique = false, nullable = false, updatable = false)
    private LocalDateTime fechaModificacion;

    @Column(name = "idUsuarioModificador", unique = false, nullable = false, updatable = false)
    private Integer idUsuarioModificador;

    @Column(name = "descripcion", unique = false, nullable = false, updatable = false)
    private String descripcion;
}
