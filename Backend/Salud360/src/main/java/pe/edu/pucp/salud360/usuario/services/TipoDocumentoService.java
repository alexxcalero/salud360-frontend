package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dto.TipoDocumentoDTO;

import java.util.List;

public interface TipoDocumentoService {
    TipoDocumentoDTO crearTipoDocumento(TipoDocumentoDTO tipoDocumentoDTO);
    TipoDocumentoDTO actualizarTipoDocumento(Integer idTipoDocumento, TipoDocumentoDTO tipoDocumentoDTO);
    void eliminarTipoDocumento(Integer idTipoDocumento);
    List<TipoDocumentoDTO> listarTiposDocumentosTodos();
    TipoDocumentoDTO buscarTipoDocumentoPorId(Integer idTipoDocumento);
}
