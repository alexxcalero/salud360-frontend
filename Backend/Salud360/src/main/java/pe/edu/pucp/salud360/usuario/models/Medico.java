package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "medico")
@PrimaryKeyJoinColumn(name = "idUsuario")
public class Medico extends Usuario {
    @Column(name = "especialidad", unique = false, nullable = false, updatable = true)
    private String especialidad;

    @Column(name = "descripcion", unique = false, nullable = false, updatable = true)
    private String descripcion;

    @OneToMany(mappedBy = "medico")
    private List<CitaMedica> citasMedicas;
}
