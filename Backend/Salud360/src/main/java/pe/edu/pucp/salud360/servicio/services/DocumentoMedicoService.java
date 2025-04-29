package pe.edu.pucp.salud360.servicio.services;

import pe.edu.pucp.salud360.servicio.dto.DocumentoMedicoDTO;

import java.util.List;

public interface DocumentoMedicoService {
    DocumentoMedicoDTO crearDocumentoMedico(DocumentoMedicoDTO documentoMedicoDTO);
    DocumentoMedicoDTO actualizarDocumentoMedico(Integer idDocumentoMedico, DocumentoMedicoDTO documentoMedicoDTO);
    void eliminarDocumentoMedico(Integer idDocumentoMedico);
    List<DocumentoMedicoDTO> listarDocumentosMedicosTodos();
    DocumentoMedicoDTO buscarDocumentoMedicoPorId(Integer idDocumentoMedico);
}
