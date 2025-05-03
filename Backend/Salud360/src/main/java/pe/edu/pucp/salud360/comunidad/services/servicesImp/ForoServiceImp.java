package pe.edu.pucp.salud360.comunidad.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.comunidad.dto.ForoDTO;
import pe.edu.pucp.salud360.comunidad.mappers.ForoMapper;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.comunidad.models.Foro;
import pe.edu.pucp.salud360.comunidad.repositories.ComunidadRepository;
import pe.edu.pucp.salud360.comunidad.repositories.ForoRepository;
import pe.edu.pucp.salud360.comunidad.services.ForoService;

import java.util.List;
import java.util.Optional;

@Service
public class ForoServiceImp implements ForoService {
    @Autowired
    private ForoRepository foroRepository;

    @Autowired
    private ComunidadRepository comunidadRepository;

    @Override
    public ForoDTO crearForo(ForoDTO dto) {
        Comunidad comunidad = comunidadRepository.findById(dto.getIdComunidad()).orElse(null);
        Foro foro = ForoMapper.mapToModel(dto, comunidad);
        return ForoMapper.mapToDTO(foroRepository.save(foro));
    }

    @Override
    public ForoDTO actualizarForo(Integer id, ForoDTO dto) {
        Optional<Foro> optional = foroRepository.findById(id);
        if (optional.isPresent()) {
            Comunidad comunidad = comunidadRepository.findById(dto.getIdComunidad()).orElse(null);
            Foro actualizado = ForoMapper.mapToModel(dto, comunidad);
            actualizado.setIdForo(id);
            return ForoMapper.mapToDTO(foroRepository.save(actualizado));
        }
        return null;
    }

    @Override
    public boolean eliminarForo(Integer id) {
        Optional<Foro> optional = foroRepository.findById(id);
        if (optional.isPresent()) {
            foroRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public ForoDTO buscarPorId(Integer id) {
        return foroRepository.findById(id)
                .map(ForoMapper::mapToDTO)
                .orElse(null);
    }

    @Override
    public List<ForoDTO> listarTodos() {
        return foroRepository.findAll().stream()
                .map(ForoMapper::mapToDTO)
                .toList();
    }
}
