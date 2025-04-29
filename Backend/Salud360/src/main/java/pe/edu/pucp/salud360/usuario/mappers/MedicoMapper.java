package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.MedicoDTO;
import pe.edu.pucp.salud360.usuario.models.Medico;

public class MedicoMapper {
    public static MedicoDTO mapToDTO(Medico medico) {
        if(medico == null)
            return null;

        return new MedicoDTO(medico.getEspecialidad(), medico.getDescripcion(), medico.getCitasMedicas());
    }

    public static Medico mapToModel(MedicoDTO medicoDTO) {
        if(medicoDTO == null)
            return null;

        return new Medico(medicoDTO.getEspecialidad(), medicoDTO.getDescripcion(), medicoDTO.getCitaMedica());
    }
}
