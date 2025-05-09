package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.TipoDocumentoDTO;
import pe.edu.pucp.salud360.usuario.mappers.TipoDocumentoMapper;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;
import pe.edu.pucp.salud360.usuario.repositories.TipoDocumentoRepository;
import pe.edu.pucp.salud360.usuario.services.TipoDocumentoService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TipoDocumentoServiceImp implements TipoDocumentoService {
    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Override
    public TipoDocumentoDTO crearTipoDocumento(TipoDocumentoDTO tipoDocumentoDTO) {
        TipoDocumento tipoDocumento = TipoDocumentoMapper.mapToModel(tipoDocumentoDTO);
        tipoDocumento.setActivo(true);
        tipoDocumento.setFechaCreacion(LocalDateTime.now());
        tipoDocumento.setFechaDesactivacion(null);
        TipoDocumento tipoDocumentoCreado = tipoDocumentoRepository.save(tipoDocumento);
        return TipoDocumentoMapper.mapToDTO(tipoDocumentoCreado);
    }

    @Override
    public TipoDocumentoDTO actualizarTipoDocumento(Integer idTipoDocumento, TipoDocumentoDTO tipoDocumentoDTO) {
        if(tipoDocumentoRepository.findById(idTipoDocumento).isPresent()) {
            TipoDocumento tipoDocumento = tipoDocumentoRepository.findById(idTipoDocumento).get();
            tipoDocumento.setNombre(tipoDocumentoDTO.getNombre());
            TipoDocumento tipoDocumentoActualizado = tipoDocumentoRepository.save(tipoDocumento);
            return TipoDocumentoMapper.mapToDTO(tipoDocumentoActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarTipoDocumento(Integer idTipoDocumento) {
        if(tipoDocumentoRepository.findById(idTipoDocumento).isPresent()) {
            TipoDocumento tipoDocumentoEliminar = tipoDocumentoRepository.findById(idTipoDocumento).get();
            tipoDocumentoEliminar.setActivo(false);
            tipoDocumentoEliminar.setFechaDesactivacion(LocalDateTime.now());
            tipoDocumentoRepository.save(tipoDocumentoEliminar);
        }
    }

    @Override
    public List<TipoDocumentoDTO> listarTiposDocumentosTodos() {
        List<TipoDocumento> tiposDocumentos = tipoDocumentoRepository.findAll();
        if(!(tiposDocumentos.isEmpty())) {
            return tiposDocumentos.stream().map(TipoDocumentoMapper::mapToDTO).toList();
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public TipoDocumentoDTO buscarTipoDocumentoPorId(Integer idTipoDocumento) {
        if(tipoDocumentoRepository.findById(idTipoDocumento).isPresent()) {
            TipoDocumento tipoDocumentoBuscado = tipoDocumentoRepository.findById(idTipoDocumento).get();
            return TipoDocumentoMapper.mapToDTO(tipoDocumentoBuscado);
        } else {
            return null;
        }
    }
}
