package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.TipoDocumentoDTO;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;

public class TipoDocumentoMapper {
    public static TipoDocumentoDTO mapToDTO(TipoDocumento tipoDocumento) {
        if(tipoDocumento == null)
            return null;

        return new TipoDocumentoDTO(tipoDocumento.getIdTipoDocumento(), tipoDocumento.getNombre(), tipoDocumento.getActivo(), tipoDocumento.getUsuarios());
    }

    public static TipoDocumento mapToModel(TipoDocumentoDTO tipoDocumentoDTO) {
        if(tipoDocumentoDTO == null)
            return null;

        return new TipoDocumento(tipoDocumentoDTO.getIdTipoDocumento(), tipoDocumentoDTO.getNombre(), tipoDocumentoDTO.getActivo(), tipoDocumentoDTO.getUsuarios());
    }
}
