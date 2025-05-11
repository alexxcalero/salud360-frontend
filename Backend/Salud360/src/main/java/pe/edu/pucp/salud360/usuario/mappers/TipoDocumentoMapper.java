package pe.edu.pucp.salud360.usuario.mappers;

import org.mapstruct.Mapper;
import pe.edu.pucp.salud360.usuario.dtos.tipoDocumentoDTO.TipoDocumentoVistaAdminDTO;
import pe.edu.pucp.salud360.usuario.dtos.tipoDocumentoDTO.TipoDocumentoVistaClienteDTO;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;

@Mapper(componentModel = "spring")
public interface TipoDocumentoMapper {
    TipoDocumentoVistaClienteDTO mapToVistaClienteDTO(TipoDocumento tipoDocumento);
    TipoDocumento mapToModel(TipoDocumentoVistaClienteDTO tipoDocumentoDTO);

    TipoDocumentoVistaAdminDTO mapToVistaAdminDTO(TipoDocumento tipoDocumento);
    TipoDocumento mapToModel(TipoDocumentoVistaAdminDTO tipoDocumentoDTO);
}
