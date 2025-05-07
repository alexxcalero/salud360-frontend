package pe.edu.pucp.salud360.membresia.services.servicesImp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.membresia.dto.SolicitudDTO;
import pe.edu.pucp.salud360.membresia.models.Afiliacion;
import pe.edu.pucp.salud360.membresia.models.Solicitud;
import pe.edu.pucp.salud360.membresia.repositories.AfiliacionRepository;
import pe.edu.pucp.salud360.membresia.repositories.SolicitudRepository;
import pe.edu.pucp.salud360.membresia.services.SolicitudService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SolicitudImp implements SolicitudService {

    private final SolicitudRepository solicitudRepository;
    private final AfiliacionRepository afiliacionRepository;

    @Override
    public List<SolicitudDTO> listarSolicitudes() {
        return solicitudRepository.findAll().stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    @Override
    public SolicitudDTO obtenerSolicitudPorId(Integer id) {
        return solicitudRepository.findById(id).map(this::convertirADTO).orElse(null);
    }

    @Override
    public SolicitudDTO crearSolicitud(SolicitudDTO dto) {
        Solicitud solicitud = convertirAEntidad(dto);
        return convertirADTO(solicitudRepository.save(solicitud));
    }

    @Override
    public SolicitudDTO actualizarSolicitud(Integer id, SolicitudDTO dto) {
        Optional<Solicitud> optional = solicitudRepository.findById(id);
        if (optional.isEmpty()) return null;

        Solicitud solicitud = optional.get();
        solicitud.setCantDias(dto.getCantDias());
        solicitud.setEstado(dto.getEstado());
        solicitud.setAfiliacion(afiliacionRepository.findById(dto.getIdAfiliacion()).orElse(null));

        return convertirADTO(solicitudRepository.save(solicitud));
    }

    @Override
    public void eliminarSolicitud(Integer id) {
        solicitudRepository.deleteById(id);
    }

    private SolicitudDTO convertirADTO(Solicitud s) {
        return new SolicitudDTO(
                s.getIdSolicitud(),
                s.getCantDias(),
                s.getEstado(),
                s.getAfiliacion() != null ? s.getAfiliacion().getIdMembresia() : null
        );
    }

    private Solicitud convertirAEntidad(SolicitudDTO dto) {
        Solicitud s = new Solicitud();
        s.setCantDias(dto.getCantDias());
        s.setEstado(dto.getEstado());
        s.setAfiliacion(afiliacionRepository.findById(dto.getIdAfiliacion()).orElse(null));
        return s;
    }
}
