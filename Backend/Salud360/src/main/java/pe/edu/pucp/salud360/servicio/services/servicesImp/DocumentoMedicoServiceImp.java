package pe.edu.pucp.salud360.servicio.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.servicio.dto.DocumentoMedicoDTO;
import pe.edu.pucp.salud360.servicio.repositories.DocumentoMedicoRepository;
import pe.edu.pucp.salud360.servicio.services.DocumentoMedicoService;

import java.util.List;

@Service
public class DocumentoMedicoServiceImp implements DocumentoMedicoService {
    @Autowired
    private DocumentoMedicoRepository documentoMedicoRepository;

    @Override
    public DocumentoMedicoDTO crearDocumentoMedico(DocumentoMedicoDTO documentoMedicoDTO) {
        return null;
    }

    @Override
    public DocumentoMedicoDTO actualizarDocumentoMedico(Integer idDocumentoMedico, DocumentoMedicoDTO documentoMedicoDTO) {
        return null;
    }

    @Override
    public void eliminarDocumentoMedico(Integer idDocumentoMedico) {

    }

    @Override
    public List<DocumentoMedicoDTO> listarDocumentosMedicosTodos() {
        return List.of();
    }

    @Override
    public DocumentoMedicoDTO buscarDocumentoMedicoPorId(Integer idDocumentoMedico) {
        return null;
    }
}
