package pe.edu.pucp.salud360.servicio.models;

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
@Table(name = "documentoMedico")
public class DocumentoMedico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDocumentoMedico;

    @Column(name = "documento", unique = false, nullable = false, updatable = true)
    private String documento;

    @ManyToOne
    @JoinColumn(name = "idCitaMedica")
    private CitaMedica citaMedica;
}
