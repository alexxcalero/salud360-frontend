package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.PersonaDTO;
import pe.edu.pucp.salud360.usuario.models.Persona;

public class PersonaMapper {
    public static PersonaDTO mapToDTO(Persona persona) {
        if(persona == null)
            return null;

        return new PersonaDTO(persona.getFotoPerfil(), persona.getComunidades(), persona.getAfiliaciones(), persona.getMediosDePago(),
                              persona.getPublicaciones(), persona.getComentarios(), persona.getTestimonios(), persona.getClases(),
                              persona.getNotificaciones(), persona.getReservas(), persona.getCitasMedicas());
    }

    public static Persona mapToModel(PersonaDTO personaDTO) {
        if(personaDTO == null)
            return null;

        return new Persona(personaDTO.getFotoPerfil(), personaDTO.getComunidades(), personaDTO.getAfiliaciones(), personaDTO.getMediosDePago(),
                personaDTO.getPublicaciones(), personaDTO.getComentarios(), personaDTO.getTestimonios(), personaDTO.getClases(),
                personaDTO.getNotificaciones(), personaDTO.getReservas(), personaDTO.getCitasMedicas());
    }
}
