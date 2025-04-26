package pe.edu.pucp.salud360.membresia.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Afiliacion {
    private Integer idAfiliacion;
    private Membresia membresia;
    private String estado;  // Activado, Cancelado, Suspendido
    private LocalDateTime fechaAfiliacion;
    private LocalDateTime fechaDesafiliacion;
    private Integer maxReservas;
    private LocalDate fechaReactivacion;
}
