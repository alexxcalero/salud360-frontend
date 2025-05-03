package pe.edu.pucp.salud360.membresia.mappers;

import pe.edu.pucp.salud360.membresia.dto.AfiliacionDTO;
import pe.edu.pucp.salud360.membresia.models.Afiliacion;
import pe.edu.pucp.salud360.control.models.Reporte;

import java.util.List;
import java.util.stream.Collectors;

public class AfiliacionMapper {

    public static AfiliacionDTO mapToDTO(Afiliacion afiliacion) {
        if (afiliacion == null) return null;

        List<Integer> idsReportes = afiliacion.getReportes() != null ?
                afiliacion.getReportes().stream().map(Reporte::getIdReporte).collect(Collectors.toList()) : null;

        return new AfiliacionDTO(
                afiliacion.getIdMembresia(),
                afiliacion.getEstado(),
                afiliacion.getFechaAfiliacion(),
                afiliacion.getFechaDesafiliacion(),
                afiliacion.getMaxReservas(),
                afiliacion.getFechaReactivacion(),
                afiliacion.getMedioDePago() != null ? afiliacion.getMedioDePago().getIdMedioDePago() : null,
                afiliacion.getPersona() != null ? afiliacion.getPersona().getIdUsuario() : null,
                idsReportes
        );
    }
}

