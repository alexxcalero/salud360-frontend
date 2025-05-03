package pe.edu.pucp.salud360.control.mappers;

import pe.edu.pucp.salud360.control.dto.ReporteDTO;
import pe.edu.pucp.salud360.control.models.Reporte;
import pe.edu.pucp.salud360.membresia.models.Afiliacion;
import pe.edu.pucp.salud360.membresia.models.Pago;


import java.util.List;
import java.util.stream.Collectors;

public class ReporteMapper {

    public static ReporteDTO mapToDTO(Reporte reporte) {
        if (reporte == null) return null;

        List<Integer> idAfiliaciones = reporte.getAfiliacion() != null ?
                reporte.getAfiliacion().stream().map(Afiliacion::getIdMembresia).collect(Collectors.toList()) : null;

        List<Integer> idPagos = reporte.getPago() != null ?
                reporte.getPago().stream().map(Pago::getIdPago).collect(Collectors.toList()) : null;

        return new ReporteDTO(
                reporte.getIdReporte(),
                reporte.getFechaCreacion(),
                idAfiliaciones,
                idPagos
        );
    }

    public static Reporte mapToModel(ReporteDTO dto, List<Afiliacion> afiliaciones, List<Pago> pagos) {
        Reporte reporte = new Reporte();
        reporte.setIdReporte(dto.getIdReporte());
        reporte.setFechaCreacion(dto.getFechaCreacion());
        reporte.setAfiliacion(afiliaciones);
        reporte.setPago(pagos);
        return reporte;
    }
}

