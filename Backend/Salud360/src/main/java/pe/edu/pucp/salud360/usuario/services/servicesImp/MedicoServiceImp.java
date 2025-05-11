package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dtos.MedicoDTO;
import pe.edu.pucp.salud360.usuario.mappers.MedicoMapper;
import pe.edu.pucp.salud360.usuario.mappers.RolMapper;
import pe.edu.pucp.salud360.usuario.mappers.TipoDocumentoMapper;
import pe.edu.pucp.salud360.usuario.models.Medico;
import pe.edu.pucp.salud360.usuario.repositories.MedicoRepository;
import pe.edu.pucp.salud360.usuario.services.MedicoService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MedicoServiceImp implements MedicoService {
    @Autowired
    private MedicoRepository medicoRepository;

    @Override
    public MedicoDTO crearMedico(MedicoDTO medicoDTO) {
        Medico medico = MedicoMapper.mapToModel(medicoDTO);
        medico.setActivo(true);
        medico.setFechaCreacion(LocalDateTime.now());
        medico.setFechaDesactivacion(null);
        Medico medicoCreado = medicoRepository.save(medico);
        return MedicoMapper.mapToDTO(medicoCreado);
    }

    @Override
    public MedicoDTO actualizarMedico(Integer idMedico, MedicoDTO medicoDTO) {
        if(medicoRepository.findById(idMedico).isPresent()){
            Medico medico = medicoRepository.findById(idMedico).get();
            medico.setNombres(medicoDTO.getNombres());
            medico.setApellidos(medicoDTO.getApellidos());
            medico.setNumeroDocumento(medicoDTO.getNumeroDocumento());
            //medico.setTipoDocumento(TipoDocumentoMapper.mapToModel(medicoDTO.getTipoDocumento()));
            //medico.setRol(RolMapper.mapToModel(medicoDTO.getRol()));
            medico.setEspecialidad(medicoDTO.getEspecialidad());
            medico.setDescripcion(medicoDTO.getDescripcion());
            Medico medicoActualizado = medicoRepository.save(medico);
            return MedicoMapper.mapToDTO(medicoActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarMedico(Integer idMedico) {
        Optional<Medico> medico = medicoRepository.findById(idMedico);
        if(medico.isPresent()) {
            Medico medicoEliminar = medico.get();
            medicoEliminar.setActivo(false);
            medicoEliminar.setFechaDesactivacion(LocalDateTime.now());
            medicoRepository.save(medicoEliminar);
        }
    }

    @Override
    public List<MedicoDTO> listarMedicosTodos() {
        List<Medico> medicos = medicoRepository.findAll();
        return medicos.stream().map(medico -> {
            MedicoDTO dto = MedicoMapper.mapToDTO(medico);
            System.out.println("Especialidad: " + dto.getEspecialidad()); // 👈 revisa en consola
            return dto;
        }).toList();
    }

    @Override
    public MedicoDTO buscarMedicoPorId(Integer idMedico) {
        if(medicoRepository.findById(idMedico).isPresent()) {
            Medico medicoBuscado = medicoRepository.findById(idMedico).get();
            return MedicoMapper.mapToDTO(medicoBuscado);
        } else {
            return null;
        }
    }
}
