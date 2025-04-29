package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.TipoDocumentoDTO;
import pe.edu.pucp.salud360.usuario.repositories.TipoDocumentoRepository;
import pe.edu.pucp.salud360.usuario.services.TipoDocumentoService;

import java.util.List;

@Service
public class TipoDocumentoServiceImp implements TipoDocumentoService {
    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Override
    public TipoDocumentoDTO crearTipoDocumento(TipoDocumentoDTO tipoDocumentoDTO) {
        return null;
    }

    @Override
    public TipoDocumentoDTO actualizarTipoDocumento(Integer idTipoDocumento, TipoDocumentoDTO tipoDocumentoDTO) {
        return null;
    }

    @Override
    public void eliminarTipoDocumento(Integer idTipoDocumento) {

    }

    @Override
    public List<TipoDocumentoDTO> listarTiposDocumentosTodos() {
        return List.of();
    }

    @Override
    public TipoDocumentoDTO buscarTipoDocumentoPorId(Integer idTipoDocumento) {
        return null;
    }
}
