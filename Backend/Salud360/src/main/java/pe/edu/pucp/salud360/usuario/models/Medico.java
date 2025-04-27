package pe.edu.pucp.salud360.usuario.models;

import pe.edu.pucp.salud360.servicio.models.CitaMedica;

import java.util.List;

public class Medico extends Usuario {
    private String especialidad;
    private String descripcion;

    private List<CitaMedica> citaMedica;
}
