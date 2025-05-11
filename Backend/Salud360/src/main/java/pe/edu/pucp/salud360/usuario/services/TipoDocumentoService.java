package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dtos.tipoDocumentoDTO.TipoDocumentoVistaAdminDTO;

import java.util.List;

public interface TipoDocumentoService {
    TipoDocumentoVistaAdminDTO crearTipoDocumento(TipoDocumentoVistaAdminDTO tipoDocumentoDTO);
    TipoDocumentoVistaAdminDTO actualizarTipoDocumento(Integer idTipoDocumento, TipoDocumentoVistaAdminDTO tipoDocumentoDTO);
    void eliminarTipoDocumento(Integer idTipoDocumento);
    List<TipoDocumentoVistaAdminDTO> listarTiposDocumentosTodos();
    TipoDocumentoVistaAdminDTO buscarTipoDocumentoPorId(Integer idTipoDocumento);
}
