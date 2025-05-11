package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dtos.PersonaDTO;
import pe.edu.pucp.salud360.usuario.models.Persona;

// idUsuario, nombres, apellidos, numeroDocumento, correo, contrasenha, telefono, fechaNacimiento, activo, tipoDocumento, rol
public class PersonaMapper {
    public static PersonaDTO mapToDTO(Persona persona) {
        if(persona == null)
            return null;

        return PersonaDTO.builder()
                .idUsuario(persona.getIdUsuario())
                .nombres(persona.getNombres())
                .apellidos(persona.getApellidos())
                .numeroDocumento(persona.getNumeroDocumento())
                .correo(persona.getCorreo())
                .contrasenha(persona.getContrasenha())
                .telefono(persona.getTelefono())
                .fechaNacimiento(persona.getFechaNacimiento())
                .activo(persona.getActivo())
                //.tipoDocumento(TipoDocumentoMapper.mapToDTO(persona.getTipoDocumento()))
                //.rol(RolMapper.mapToDTO(persona.getRol()))
                .fotoPefil(persona.getFotoPerfil())
                .comunidades(persona.getComunidades())
                .afiliaciones(persona.getAfiliaciones())
                .mediosDePago(persona.getMediosDePago())
                .publicaciones(persona.getPublicaciones())
                .comentarios(persona.getComentarios())
                .testimonios(persona.getTestimonios())
                .clases(persona.getClases())
                .notificaciones(persona.getNotificaciones())
                .reservas(persona.getReservas())
                .citasMedicas(persona.getCitasMedicas())
                .build();
    }

    public static Persona mapToModel(PersonaDTO personaDTO) {
        if(personaDTO == null)
            return null;

        return Persona.builder()
                .idUsuario(personaDTO.getIdUsuario())
                .nombres(personaDTO.getNombres())
                .apellidos(personaDTO.getApellidos())
                .numeroDocumento(personaDTO.getNumeroDocumento())
                .correo(personaDTO.getCorreo())
                .contrasenha(personaDTO.getContrasenha())
                .telefono(personaDTO.getTelefono())
                .fechaNacimiento(personaDTO.getFechaNacimiento())
                .activo(personaDTO.getActivo())
                //.tipoDocumento(TipoDocumentoMapper.mapToModel(personaDTO.getTipoDocumento()))
                //.rol(RolMapper.mapToModel(personaDTO.getRol()))
                .fotoPerfil(personaDTO.getFotoPefil())
                .comunidades(personaDTO.getComunidades())
                .afiliaciones(personaDTO.getAfiliaciones())
                .mediosDePago(personaDTO.getMediosDePago())
                .publicaciones(personaDTO.getPublicaciones())
                .comentarios(personaDTO.getComentarios())
                .testimonios(personaDTO.getTestimonios())
                .clases(personaDTO.getClases())
                .notificaciones(personaDTO.getNotificaciones())
                .reservas(personaDTO.getReservas())
                .citasMedicas(personaDTO.getCitasMedicas())
                .build();
    }
}
