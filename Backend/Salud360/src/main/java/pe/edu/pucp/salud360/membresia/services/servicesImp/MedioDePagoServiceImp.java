package pe.edu.pucp.salud360.membresia.services.servicesImp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.membresia.dto.MedioDePagoDTO;
import pe.edu.pucp.salud360.membresia.mappers.MedioDePagoMapper;
import pe.edu.pucp.salud360.membresia.models.MedioDePago;
import pe.edu.pucp.salud360.membresia.repositories.MedioDePagoRepository;
import pe.edu.pucp.salud360.membresia.services.MedioDePagoService;
import pe.edu.pucp.salud360.usuario.models.Persona;
import pe.edu.pucp.salud360.usuario.repositories.PersonaRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedioDePagoServiceImp implements MedioDePagoService {

    @Autowired
    private MedioDePagoRepository medioDePagoRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public List<MedioDePagoDTO> listar() {
        return medioDePagoRepository.findAll().stream()
                .map(MedioDePagoMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MedioDePagoDTO crear(MedioDePagoDTO dto) {
        Persona persona = personaRepository.findById(dto.getIdUsuario()).orElse(null);
        MedioDePago m = MedioDePagoMapper.mapToModel(dto, persona);
        return MedioDePagoMapper.mapToDTO(medioDePagoRepository.save(m));
    }

    @Override
    public MedioDePagoDTO obtenerPorId(Integer id) {
        return medioDePagoRepository.findById(id)
                .map(MedioDePagoMapper::mapToDTO)
                .orElse(null);
    }

    @Override
    public boolean eliminar(Integer id) {
        if (medioDePagoRepository.existsById(id)) {
            medioDePagoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public MedioDePagoDTO actualizar(Integer id, MedioDePagoDTO dto) {
        if (!medioDePagoRepository.existsById(id)) return null;
        Persona persona = personaRepository.findById(dto.getIdUsuario()).orElse(null);
        dto.setIdMedioDePago(id);
        MedioDePago m = MedioDePagoMapper.mapToModel(dto, persona);
        return MedioDePagoMapper.mapToDTO(medioDePagoRepository.save(m));
    }
}

