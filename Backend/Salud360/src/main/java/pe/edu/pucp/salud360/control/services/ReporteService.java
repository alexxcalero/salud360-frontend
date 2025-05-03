package pe.edu.pucp.salud360.control.services;


import pe.edu.pucp.salud360.control.dto.ReporteDTO;

import java.util.List;

public interface ReporteService {
    List<ReporteDTO> listarReportes();
    ReporteDTO crearReporte(ReporteDTO reporteDTO);
    ReporteDTO obtenerReportePorId(Integer id);
    boolean eliminarReporte(Integer id);
}
