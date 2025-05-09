package pe.edu.pucp.salud360.servicio.services.servicesImp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.servicio.dto.CitaMedicaDTO;
import pe.edu.pucp.salud360.servicio.mappers.CitaMedicaMapper;
import pe.edu.pucp.salud360.servicio.models.CitaMedica;
import pe.edu.pucp.salud360.servicio.models.Servicio;
import pe.edu.pucp.salud360.servicio.repositories.CitaMedicaRepository;
import pe.edu.pucp.salud360.servicio.repositories.ServicioRepository;
import pe.edu.pucp.salud360.usuario.models.Medico;
import pe.edu.pucp.salud360.usuario.models.Persona;
import pe.edu.pucp.salud360.usuario.repositories.MedicoRepository;
import pe.edu.pucp.salud360.usuario.repositories.PersonaRepository;
import pe.edu.pucp.salud360.servicio.services.CitaMedicaService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CitaMedicaServiceImp implements CitaMedicaService {

    @Autowired
    private CitaMedicaRepository citaMedicaRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Override
    public CitaMedicaDTO crearCitaMedica(CitaMedicaDTO dto) {
        Servicio servicio = servicioRepository.findById(dto.getServicio().getIdServicio()).orElse(null);
        Persona usuario = personaRepository.findById(dto.getPersona().getIdUsuario()).orElse(null);
        Medico medico = medicoRepository.findById(dto.getMedico().getIdUsuario()).orElse(null);

        CitaMedica cita = CitaMedicaMapper.mapToModel(dto, servicio, usuario, medico);
        cita.setFechaCreacion(LocalDateTime.now());
        cita.setActivo(true);

        return CitaMedicaMapper.mapToDTO(citaMedicaRepository.save(cita));
    }

    @Override
    public CitaMedicaDTO actualizarCitaMedica(Integer id, CitaMedicaDTO dto) {
        Optional<CitaMedica> optional = citaMedicaRepository.findById(id);
        if (optional.isEmpty()) return null;

        CitaMedica cita = optional.get();

        cita.setFecha(dto.getFecha());
        cita.setHoraInicio(dto.getHoraInicio());
        cita.setEstado(dto.getEstado());
        cita.setActivo(dto.getActivo());

        return CitaMedicaMapper.mapToDTO(citaMedicaRepository.save(cita));
    }

    @Override
    public void eliminarCitaMedica(Integer id) {
        citaMedicaRepository.deleteById(id);
    }

    @Override
    public List<CitaMedicaDTO> listarCitasMedicasTodas() {
        return citaMedicaRepository.findAll().stream()
                .map(CitaMedicaMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CitaMedicaDTO buscarCitaMedicaPorId(Integer id) {
        return citaMedicaRepository.findById(id)
                .map(CitaMedicaMapper::mapToDTO)
                .orElse(null);
    }
}

