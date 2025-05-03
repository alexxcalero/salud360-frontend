package pe.edu.pucp.salud360.membresia.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.comunidad.repositories.ComunidadRepository;
import pe.edu.pucp.salud360.membresia.dto.MembresiaDTO;
import pe.edu.pucp.salud360.membresia.mappers.MembresiaMapper;
import pe.edu.pucp.salud360.membresia.models.Membresia;
import pe.edu.pucp.salud360.membresia.repositories.MembresiaRepository;
import pe.edu.pucp.salud360.membresia.services.MembresiaService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MembresiaServiceImp implements MembresiaService {

    @Autowired
    private MembresiaRepository membresiaRepository;

    @Autowired
    private ComunidadRepository comunidadRepository;

    @Override
    public MembresiaDTO crearMembresia(MembresiaDTO dto) {
        Comunidad comunidad = comunidadRepository.findById(dto.getIdComunidad()).orElse(null);
        Membresia m = MembresiaMapper.mapToModel(dto, comunidad);
        return MembresiaMapper.mapToDTO(membresiaRepository.save(m));
    }

    @Override
    public List<MembresiaDTO> listarMembresias() {
        return membresiaRepository.findAll().stream().map(MembresiaMapper::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public MembresiaDTO buscarMembresiaPorId(Integer id) {
        return membresiaRepository.findById(id).map(MembresiaMapper::mapToDTO).orElse(null);
    }

    @Override
    public MembresiaDTO actualizarMembresia(Integer id, MembresiaDTO dto) {
        if (!membresiaRepository.existsById(id)) return null;
        dto.setIdMembresia(id);
        Comunidad comunidad = comunidadRepository.findById(dto.getIdComunidad()).orElse(null);
        Membresia m = MembresiaMapper.mapToModel(dto, comunidad);
        return MembresiaMapper.mapToDTO(membresiaRepository.save(m));
    }

    @Override
    public boolean eliminarMembresia(Integer id) {
        if (!membresiaRepository.existsById(id)) return false;
        membresiaRepository.deleteById(id);
        return true;
    }
}
