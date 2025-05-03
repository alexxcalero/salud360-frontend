package pe.edu.pucp.salud360.control.services.servicesImp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.control.dto.AuditoriaDTO;
import pe.edu.pucp.salud360.control.mappers.AuditoriaMapper;
import pe.edu.pucp.salud360.control.models.Auditoria;
import pe.edu.pucp.salud360.control.repositories.AuditoriaRepository;
import pe.edu.pucp.salud360.control.services.AuditoriaService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuditoriaServiceImp implements AuditoriaService {

    @Autowired
    private AuditoriaRepository auditoriaRepository;

    @Override
    public AuditoriaDTO crearAuditoria(AuditoriaDTO auditoriaDTO) {
        auditoriaDTO.setFechaModificacion(LocalDateTime.now());
        Auditoria auditoria = AuditoriaMapper.mapToModel(auditoriaDTO);
        return AuditoriaMapper.mapToDTO(auditoriaRepository.save(auditoria));
    }

    @Override
    public AuditoriaDTO obtenerAuditoriaPorId(Integer id) {
        Auditoria auditoria = auditoriaRepository.findById(id).orElse(null);
        return AuditoriaMapper.mapToDTO(auditoria);
    }

    @Override
    public List<AuditoriaDTO> listarAuditorias() {
        List<Auditoria> auditorias = auditoriaRepository.findAll();
        return auditorias.stream().map(AuditoriaMapper::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public AuditoriaDTO buscarAuditoriaPorId(Integer id) {
        Auditoria auditoria = auditoriaRepository.findById(id).orElse(null);
        return AuditoriaMapper.mapToDTO(auditoria);
    }

    @Override
    public boolean eliminarAuditoria(Integer id) {
        if (auditoriaRepository.existsById(id)) {
            auditoriaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public AuditoriaDTO actualizarAuditoria(Integer id, AuditoriaDTO auditoriaDTO) {
        if (!auditoriaRepository.existsById(id)) return null;

        auditoriaDTO.setIdAuditoria(id);
        auditoriaDTO.setFechaModificacion(LocalDateTime.now());
        Auditoria auditoria = AuditoriaMapper.mapToModel(auditoriaDTO);
        return AuditoriaMapper.mapToDTO(auditoriaRepository.save(auditoria));
    }
}

