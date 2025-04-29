package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dto.PersonaDTO;

import java.util.List;

public interface PersonaService {
    PersonaDTO crearPersona(PersonaDTO personaDTO);
    PersonaDTO actualizarPersona(Integer idPersona, PersonaDTO personaDTO);
    void eliminarPersona(Integer idPersona);
    List<PersonaDTO> listarPersonasTodas();
    PersonaDTO buscarPersonaPorId(Integer idPersona);
}
