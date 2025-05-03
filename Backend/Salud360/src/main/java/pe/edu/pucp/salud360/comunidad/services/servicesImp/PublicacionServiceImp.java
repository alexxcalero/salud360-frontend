package pe.edu.pucp.salud360.comunidad.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.comunidad.dto.PublicacionDTO;
import pe.edu.pucp.salud360.comunidad.mappers.PublicacionMapper;
import pe.edu.pucp.salud360.comunidad.models.Foro;
import pe.edu.pucp.salud360.comunidad.models.Publicacion;
import pe.edu.pucp.salud360.comunidad.repositories.ForoRepository;
import pe.edu.pucp.salud360.comunidad.repositories.PublicacionRepository;
import pe.edu.pucp.salud360.comunidad.services.PublicacionService;
import pe.edu.pucp.salud360.usuario.models.Persona;
import pe.edu.pucp.salud360.usuario.repositories.PersonaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PublicacionServiceImp implements PublicacionService {

    @Autowired
    private PublicacionRepository publicacionRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private ForoRepository foroRepository;

    @Override
    public PublicacionDTO crearPublicacion(PublicacionDTO dto) {
        Persona persona = personaRepository.findById(dto.getIdUsuario()).orElse(null);
        Foro foro = foroRepository.findById(dto.getIdForo()).orElse(null);

        Publicacion publicacion = PublicacionMapper.mapToModel(dto, persona, foro);
        publicacion.setFechaCreacion(LocalDateTime.now());
        publicacion.setActivo(true);

        return PublicacionMapper.mapToDTO(publicacionRepository.save(publicacion));
    }

    @Override
    public List<PublicacionDTO> listarPublicaciones() {
        return publicacionRepository.findAll()
                .stream()
                .map(PublicacionMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PublicacionDTO obtenerPublicacionPorId(Integer id) {
        Optional<Publicacion> publicacion = publicacionRepository.findById(id);
        return publicacion.map(PublicacionMapper::mapToDTO).orElse(null);
    }

    @Override
    public PublicacionDTO actualizarPublicacion(Integer id, PublicacionDTO dto) {
        Optional<Publicacion> optional = publicacionRepository.findById(id);
        if (optional.isEmpty()) return null;

        Persona persona = personaRepository.findById(dto.getIdUsuario()).orElse(null);
        Foro foro = foroRepository.findById(dto.getIdForo()).orElse(null);

        Publicacion publicacion = optional.get();
        publicacion.setContenido(dto.getContenido());
        publicacion.setActivo(dto.getActivo());
        publicacion.setFechaDesactivacion(dto.getFechaDesactivacion());
        publicacion.setPersona(persona);
        publicacion.setForo(foro);

        return PublicacionMapper.mapToDTO(publicacionRepository.save(publicacion));
    }

    @Override
    public boolean eliminarPublicacion(Integer id) {
        Optional<Publicacion> optional = publicacionRepository.findById(id);
        if (optional.isEmpty()) return false;

        publicacionRepository.deleteById(id);
        return true;
    }
}
