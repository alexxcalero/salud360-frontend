package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dtos.tipoDocumentoDTO.TipoDocumentoVistaAdminDTO;
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

    @Autowired
    private TipoDocumentoMapper tipoDocumentoMapper;

    @Override
    public TipoDocumentoVistaAdminDTO crearTipoDocumento(TipoDocumentoVistaAdminDTO tipoDocumentoDTO) {
        TipoDocumento tipoDocumento = tipoDocumentoMapper.mapToModel(tipoDocumentoDTO);
        tipoDocumento.setActivo(true);
        tipoDocumento.setFechaCreacion(LocalDateTime.now());
        tipoDocumento.setFechaDesactivacion(null);
        TipoDocumento tipoDocumentoCreado = tipoDocumentoRepository.save(tipoDocumento);
        return tipoDocumentoMapper.mapToVistaAdminDTO(tipoDocumentoCreado);
    }

    @Override
    public TipoDocumentoVistaAdminDTO actualizarTipoDocumento(Integer idTipoDocumento, TipoDocumentoVistaAdminDTO tipoDocumentoDTO) {
        if(tipoDocumentoRepository.findById(idTipoDocumento).isPresent()) {
            TipoDocumento tipoDocumento = tipoDocumentoRepository.findById(idTipoDocumento).get();
            tipoDocumento.setNombre(tipoDocumentoDTO.getNombre());
            TipoDocumento tipoDocumentoActualizado = tipoDocumentoRepository.save(tipoDocumento);
            return tipoDocumentoMapper.mapToVistaAdminDTO(tipoDocumentoActualizado);
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
    public List<TipoDocumentoVistaAdminDTO> listarTiposDocumentosTodos() {
        List<TipoDocumento> tiposDocumentos = tipoDocumentoRepository.findAll();
        if(!(tiposDocumentos.isEmpty())) {
            return tiposDocumentos.stream().map(tipoDocumentoMapper::mapToVistaAdminDTO).toList();
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public TipoDocumentoVistaAdminDTO buscarTipoDocumentoPorId(Integer idTipoDocumento) {
        if(tipoDocumentoRepository.findById(idTipoDocumento).isPresent()) {
            TipoDocumento tipoDocumentoBuscado = tipoDocumentoRepository.findById(idTipoDocumento).get();
            return tipoDocumentoMapper.mapToVistaAdminDTO(tipoDocumentoBuscado);
        } else {
            return null;
        }
    }
}
