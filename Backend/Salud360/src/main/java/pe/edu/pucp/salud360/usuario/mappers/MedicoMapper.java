package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.MedicoDTO;
import pe.edu.pucp.salud360.usuario.models.Medico;

public class MedicoMapper {
    public static MedicoDTO mapToDTO(Medico medico) {
        if(medico == null)
            return null;

        return new MedicoDTO(medico.getIdUsuario(), medico.getNombres(), medico.getApellidos(), medico.getNumeroDocumento(),
                             medico.getCorreo(), medico.getContrasenha(), medico.getTelefono(), medico.getFechaNacimiento(),
                             medico.getActivo(), medico.getTipoDocumento(), medico.getRol(), medico.getEspecialidad(),
                             medico.getDescripcion(), medico.getCitasMedicas());
    }

    public static Medico mapToModel(MedicoDTO medicoDTO) {
        if(medicoDTO == null)
            return null;

        return new Medico(medicoDTO.getIdUsuario(), medicoDTO.getNombres(), medicoDTO.getApellidos(), medicoDTO.getNumeroDocumento(),
                          medicoDTO.getCorreo(), medicoDTO.getContrasenha(), medicoDTO.getTelefono(), medicoDTO.getFechaNacimiento(),
                          medicoDTO.getActivo(), medicoDTO.getTipoDocumento(), medicoDTO.getRol(), medicoDTO.getEspecialidad(),
                          medicoDTO.getDescripcion(), medicoDTO.getCitasMedicas());
    }
}
