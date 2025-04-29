package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "medico")
public class Medico extends Usuario {
    @Column(name = "especialidad", unique = false, nullable = false, updatable = true)
    private String especialidad;

    @Column(name = "descripcion", unique = false, nullable = false, updatable = true)
    private String descripcion;

    @OneToMany(mappedBy = "medico")
    private List<CitaMedica> citasMedicas;
}
