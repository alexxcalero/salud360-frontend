package pe.edu.pucp.salud360.usuario.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
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

    public Medico(Integer idUsuario, String nombres, String apellidos, String numeroDocumento, String correo, String contrasenha, String telefono, LocalDate fechaNacimiento, Boolean activo, TipoDocumento tipoDocumento, Rol rol, String especialidad, String descripcion, List<CitaMedica> citasMedicas) {
        super(idUsuario, nombres, apellidos, numeroDocumento, correo, contrasenha, telefono, fechaNacimiento, activo, tipoDocumento, rol);
        this.especialidad = especialidad;
        this.descripcion = descripcion;
        this.citasMedicas = citasMedicas;
    }
}
