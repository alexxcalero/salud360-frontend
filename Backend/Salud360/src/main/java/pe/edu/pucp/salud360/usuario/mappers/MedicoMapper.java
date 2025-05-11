package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dtos.MedicoDTO;
import pe.edu.pucp.salud360.usuario.models.Medico;

public class MedicoMapper {
    public static MedicoDTO mapToDTO(Medico medico) {
        if(medico == null)
            return null;

        return MedicoDTO.builder()
                .idUsuario(medico.getIdUsuario())
                .nombres(medico.getNombres())
                .apellidos(medico.getApellidos())
                .numeroDocumento(medico.getNumeroDocumento())
                .correo(medico.getCorreo())
                .contrasenha(medico.getContrasenha())
                .activo(medico.getActivo())
                //.tipoDocumento(TipoDocumentoMapper.mapToDTO(medico.getTipoDocumento()))
                //.rol(RolMapper.mapToDTO(medico.getRol()))
                .especialidad(medico.getEspecialidad())
                .descripcion(medico.getDescripcion())
                .citasMedicas(medico.getCitasMedicas())
                .build();
    }

    public static Medico mapToModel(MedicoDTO medicoDTO) {
        if(medicoDTO == null)
            return null;

        return Medico.builder()
                .idUsuario(medicoDTO.getIdUsuario())
                .nombres(medicoDTO.getNombres())
                .apellidos(medicoDTO.getApellidos())
                .numeroDocumento(medicoDTO.getNumeroDocumento())
                .correo(medicoDTO.getCorreo())
                .contrasenha(medicoDTO.getContrasenha())
                .activo(medicoDTO.getActivo())
                //.tipoDocumento(TipoDocumentoMapper.mapToModel(medicoDTO.getTipoDocumento()))
                //.rol(RolMapper.mapToModel(medicoDTO.getRol()))
                .especialidad(medicoDTO.getEspecialidad())
                .descripcion(medicoDTO.getDescripcion())
                .citasMedicas(medicoDTO.getCitasMedicas())
                .build();
    }
}
