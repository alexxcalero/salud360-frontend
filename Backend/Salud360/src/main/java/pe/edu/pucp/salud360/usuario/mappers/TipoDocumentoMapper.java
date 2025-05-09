package pe.edu.pucp.salud360.usuario.mappers;

import pe.edu.pucp.salud360.usuario.dto.TipoDocumentoDTO;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;

public class TipoDocumentoMapper {
    public static TipoDocumentoDTO mapToDTO(TipoDocumento tipoDocumento) {
        if(tipoDocumento == null)
            return null;

        return TipoDocumentoDTO.builder()
                .idTipoDocumento(tipoDocumento.getIdTipoDocumento())
                .nombre(tipoDocumento.getNombre())
                .activo(tipoDocumento.getActivo())
                .build();
    }

    public static TipoDocumento mapToModel(TipoDocumentoDTO tipoDocumentoDTO) {
        if(tipoDocumentoDTO == null)
            return null;

        return TipoDocumento.builder()
                .idTipoDocumento(tipoDocumentoDTO.getIdTipoDocumento())
                .nombre(tipoDocumentoDTO.getNombre())
                .activo(tipoDocumentoDTO.getActivo())
                .build();
    }
}
