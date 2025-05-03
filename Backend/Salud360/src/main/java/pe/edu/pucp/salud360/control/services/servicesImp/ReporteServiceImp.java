package pe.edu.pucp.salud360.control.services.servicesImp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.control.dto.ReporteDTO;
import pe.edu.pucp.salud360.control.mappers.ReporteMapper;
import pe.edu.pucp.salud360.control.models.Reporte;
import pe.edu.pucp.salud360.control.repositories.ReporteRepository;
import pe.edu.pucp.salud360.control.services.ReporteService;
import pe.edu.pucp.salud360.membresia.models.Afiliacion;
import pe.edu.pucp.salud360.membresia.models.Pago;
import pe.edu.pucp.salud360.membresia.repositories.AfiliacionRepository;
import pe.edu.pucp.salud360.membresia.repositories.PagoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReporteServiceImp implements ReporteService {

    @Autowired
    private ReporteRepository reporteRepository;

    @Autowired
    private AfiliacionRepository afiliacionRepository;

    @Autowired
    private PagoRepository pagoRepository;

    @Override
    public List<ReporteDTO> listarReportes() {
        return reporteRepository.findAll().stream()
                .map(ReporteMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ReporteDTO crearReporte(ReporteDTO dto) {
        dto.setFechaCreacion(LocalDateTime.now());

        List<Afiliacion> afiliaciones = afiliacionRepository.findAllById(dto.getIdAfiliaciones());
        List<Pago> pagos = pagoRepository.findAllById(dto.getIdPagos());

        Reporte reporte = ReporteMapper.mapToModel(dto, afiliaciones, pagos);
        return ReporteMapper.mapToDTO(reporteRepository.save(reporte));
    }

    @Override
    public ReporteDTO obtenerReportePorId(Integer id) {
        return reporteRepository.findById(id)
                .map(ReporteMapper::mapToDTO)
                .orElse(null);
    }

    @Override
    public boolean eliminarReporte(Integer id) {
        if (reporteRepository.existsById(id)) {
            reporteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

