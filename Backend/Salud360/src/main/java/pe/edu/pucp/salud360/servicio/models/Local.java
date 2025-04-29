package pe.edu.pucp.salud360.servicio.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "local")
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idLocal;

    @Column(name = "nombre", unique = false, nullable = false, updatable = true)
    private String nombre;

    @Column(name = "direccion", unique = false, nullable = false, updatable = true)
    private String direccion;

    @Column(name = "telefono", unique = false, nullable = false, updatable = true)
    private String telefono;

    @Column(name = "nombresContacto", unique = false, nullable = false, updatable = true)
    private String nombresContacto;

    @Column(name = "apellidosContacto", unique = false, nullable = false, updatable = true)
    private String apellidosContacto;

    @Column(name = "telefonoContacto", unique = false, nullable = false, updatable = true)
    private String telefonoContacto;

    @ElementCollection
    @CollectionTable(name = "imagenesDeLocal", joinColumns = @JoinColumn(name = "idLocal"))
    @Column(name = "urlImagen", unique = false, nullable = true, updatable = true)
    private List<String> imagenes;

    @Column(name = "tipoServicio", unique = false, nullable = false, updatable = true)
    private String tipoServicio;

    @Column(name = "activo", unique = false, nullable = false, updatable = true)
    private Boolean activo;

    @Column(name = "fechaCreacion", unique = false, nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fechaDesactivacion", unique = false, nullable = true, updatable = true)
    private LocalDateTime fechaDesactivacion;

    @ManyToOne
    @JoinColumn(name = "idServicio")
    private Servicio servicio;

    @OneToMany(mappedBy = "local")
    private List<Clase> clases;
}
