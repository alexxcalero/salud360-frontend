package pe.edu.pucp.salud360.comunidad.services.servicesImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.comunidad.dto.TestimonioDTO;
import pe.edu.pucp.salud360.comunidad.mappers.TestimonioMapper;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;
import pe.edu.pucp.salud360.comunidad.models.Testimonio;
import pe.edu.pucp.salud360.comunidad.repositories.ComunidadRepository;
import pe.edu.pucp.salud360.comunidad.repositories.TestimonioRepository;
import pe.edu.pucp.salud360.comunidad.services.TestimonioService;
import pe.edu.pucp.salud360.usuario.models.Persona;
import pe.edu.pucp.salud360.usuario.repositories.PersonaRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestimonioServiceImp implements TestimonioService {

    @Autowired
    private TestimonioRepository testimonioRepository;
    @Autowired
    private ComunidadRepository comunidadRepository;
    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public TestimonioDTO crearTestimonio(TestimonioDTO dto) {
        Comunidad comunidad = comunidadRepository.findById(dto.getIdComunidad()).orElse(null);
        Persona persona = personaRepository.findById(dto.getIdUsuario()).orElse(null);
        Testimonio t = TestimonioMapper.mapToModel(dto, comunidad, persona);
        return TestimonioMapper.mapToDTO(testimonioRepository.save(t));
    }

    @Override
    public TestimonioDTO actualizarTestimonio(Integer id, TestimonioDTO dto) {
        Optional<Testimonio> optional = testimonioRepository.findById(id);
        if (optional.isEmpty()) return null;

        Testimonio t = optional.get();
        t.setComentario(dto.getComentario());
        t.setCalificacion(dto.getCalificacion());
        t.setActivo(dto.getActivo());
        t.setFechaCreacion(dto.getFechaCreacion());
        t.setFechaDesactivacion(dto.getFechaDesactivacion());

        return TestimonioMapper.mapToDTO(testimonioRepository.save(t));
    }

    @Override
    public boolean eliminarTestimonio(Integer id) {
        if (!testimonioRepository.existsById(id)) return false;
        testimonioRepository.deleteById(id);
        return true;
    }

    @Override
    public List<TestimonioDTO> listarTestimonios() {
        return testimonioRepository.findAll().stream()
                .map(TestimonioMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TestimonioDTO obtenerTestimonioPorId(Integer id) {
        return testimonioRepository.findById(id).map(TestimonioMapper::mapToDTO).orElse(null);
    }
}
