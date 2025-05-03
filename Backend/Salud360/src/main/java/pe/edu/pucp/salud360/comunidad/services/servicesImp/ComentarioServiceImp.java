package pe.edu.pucp.salud360.comunidad.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.comunidad.dto.ComentarioDTO;
import pe.edu.pucp.salud360.comunidad.mappers.ComentarioMapper;
import pe.edu.pucp.salud360.comunidad.models.Comentario;
import pe.edu.pucp.salud360.comunidad.models.Publicacion;
import pe.edu.pucp.salud360.comunidad.repositories.ComentarioRepository;
import pe.edu.pucp.salud360.comunidad.repositories.PublicacionRepository;
import pe.edu.pucp.salud360.comunidad.services.ComentarioService;
import pe.edu.pucp.salud360.usuario.models.Persona;
import pe.edu.pucp.salud360.usuario.repositories.PersonaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComentarioServiceImp implements ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private PublicacionRepository publicacionRepository;

    @Override
    public ComentarioDTO crearComentario(ComentarioDTO dto) {
        Persona persona = personaRepository.findById(dto.getIdPersona()).orElse(null);
        Publicacion publicacion = publicacionRepository.findById(dto.getIdPublicacion()).orElse(null);

        Comentario comentario = ComentarioMapper.mapToModel(dto, persona, publicacion);
        comentario.setFechaCreacion(LocalDateTime.now());
        comentario.setActivo(true);

        return ComentarioMapper.mapToDTO(comentarioRepository.save(comentario));
    }

    @Override
    public ComentarioDTO actualizarComentario(Integer idComentario, ComentarioDTO dto) {
        Optional<Comentario> comentarioOpt = comentarioRepository.findById(idComentario);
        if (comentarioOpt.isEmpty()) return null;

        Comentario comentario = comentarioOpt.get();
        comentario.setContenido(dto.getContenido());
        comentario.setActivo(dto.getActivo());
        comentario.setFechaDesactivacion(dto.getFechaDesactivacion());

        return ComentarioMapper.mapToDTO(comentarioRepository.save(comentario));
    }

    @Override
    public boolean eliminarComentario(Integer id) {
        Optional<Comentario> comentarioOpt = comentarioRepository.findById(id);
        if (comentarioOpt.isPresent()) {
            comentarioRepository.delete(comentarioOpt.get());
            return true;
        }
        return false;
    }


    @Override
    public ComentarioDTO buscarComentarioPorId(Integer idComentario) {
        return comentarioRepository.findById(idComentario)
                .map(ComentarioMapper::mapToDTO)
                .orElse(null);
    }

    @Override
    public List<ComentarioDTO> listarComentarios() {
        return comentarioRepository.findAll()
                .stream()
                .map(ComentarioMapper::mapToDTO)
                .collect(Collectors.toList());
    }
}

