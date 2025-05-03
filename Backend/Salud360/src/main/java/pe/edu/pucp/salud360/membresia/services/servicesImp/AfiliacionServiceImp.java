package pe.edu.pucp.salud360.membresia.services.servicesImp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.membresia.dto.AfiliacionDTO;
import pe.edu.pucp.salud360.membresia.mappers.AfiliacionMapper;
import pe.edu.pucp.salud360.membresia.models.Afiliacion;
import pe.edu.pucp.salud360.membresia.repositories.AfiliacionRepository;
import pe.edu.pucp.salud360.membresia.services.AfiliacionService;
import pe.edu.pucp.salud360.usuario.models.Persona;
import pe.edu.pucp.salud360.usuario.repositories.PersonaRepository;
import pe.edu.pucp.salud360.membresia.models.MedioDePago;
import pe.edu.pucp.salud360.membresia.repositories.MedioDePagoRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AfiliacionServiceImp implements AfiliacionService {

    @Autowired
    private AfiliacionRepository afiliacionRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private MedioDePagoRepository medioDePagoRepository;

    @Override
    public AfiliacionDTO crearAfiliacion(AfiliacionDTO dto) {
        Afiliacion afiliacion = new Afiliacion();
        afiliacion.setEstado(dto.getEstado());
        afiliacion.setFechaAfiliacion(dto.getFechaAfiliacion());
        afiliacion.setFechaDesafiliacion(dto.getFechaDesafiliacion());
        afiliacion.setMaxReservas(dto.getMaxReservas());
        afiliacion.setFechaReactivacion(dto.getFechaReactivacion());

        afiliacion.setPersona(personaRepository.findById(dto.getIdUsuario()).orElse(null));
        afiliacion.setMedioDePago(medioDePagoRepository.findById(dto.getIdMedioDePago()).orElse(null));

        return AfiliacionMapper.mapToDTO(afiliacionRepository.save(afiliacion));
    }

    @Override
    public List<AfiliacionDTO> listarAfiliaciones() {
        return afiliacionRepository.findAll().stream()
                .map(AfiliacionMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public boolean eliminarAfiliacion(Integer id) {
        if (afiliacionRepository.existsById(id)) {
            afiliacionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public AfiliacionDTO buscarAfiliacionPorId(Integer id) {
        return afiliacionRepository.findById(id)
                .map(AfiliacionMapper::mapToDTO)
                .orElse(null);
    }

    @Override
    public AfiliacionDTO actualizarAfiliacion(Integer id, AfiliacionDTO dto) {
        if (!afiliacionRepository.existsById(id)) return null;

        Afiliacion afiliacion = new Afiliacion();
        afiliacion.setIdMembresia(id);
        afiliacion.setEstado(dto.getEstado());
        afiliacion.setFechaAfiliacion(dto.getFechaAfiliacion());
        afiliacion.setFechaDesafiliacion(dto.getFechaDesafiliacion());
        afiliacion.setMaxReservas(dto.getMaxReservas());
        afiliacion.setFechaReactivacion(dto.getFechaReactivacion());
        afiliacion.setPersona(personaRepository.findById(dto.getIdUsuario()).orElse(null));
        afiliacion.setMedioDePago(medioDePagoRepository.findById(dto.getIdMedioDePago()).orElse(null));

        return AfiliacionMapper.mapToDTO(afiliacionRepository.save(afiliacion));
    }
}

