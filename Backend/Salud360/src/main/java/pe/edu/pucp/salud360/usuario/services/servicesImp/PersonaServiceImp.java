package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.PersonaDTO;
import pe.edu.pucp.salud360.usuario.repositories.PersonaRepository;
import pe.edu.pucp.salud360.usuario.services.PersonaService;

import java.util.List;

@Service
public class PersonaServiceImp implements PersonaService {
    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public PersonaDTO crearPersona(PersonaDTO personaDTO) {
        return null;
    }

    @Override
    public PersonaDTO actualizarPersona(Integer idPersona, PersonaDTO personaDTO) {
        return null;
    }

    @Override
    public void eliminarPersona(Integer idPersona) {

    }

    @Override
    public List<PersonaDTO> listarPersonasTodas() {
        return List.of();
    }

    @Override
    public PersonaDTO buscarPersonaPorId(Integer idPersona) {
        return null;
    }
}
