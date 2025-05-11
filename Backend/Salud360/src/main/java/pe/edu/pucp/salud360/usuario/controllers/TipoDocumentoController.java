package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dtos.tipoDocumentoDTO.TipoDocumentoVistaAdminDTO;
import pe.edu.pucp.salud360.usuario.services.TipoDocumentoService;

import java.util.List;

@RestController
@RequestMapping("/api/tiposDocumentos")
public class TipoDocumentoController {
    @Autowired
    private TipoDocumentoService tipoDocumentoService;

    @PostMapping
    public ResponseEntity<TipoDocumentoVistaAdminDTO> crearTipoDocumento(@RequestBody TipoDocumentoVistaAdminDTO tipoDocumentoDTO) {
        TipoDocumentoVistaAdminDTO tipoDocumentoCreado = tipoDocumentoService.crearTipoDocumento(tipoDocumentoDTO);
        return new ResponseEntity<>(tipoDocumentoService.buscarTipoDocumentoPorId(tipoDocumentoCreado.getIdTipoDocumento()), HttpStatus.CREATED);
    }

    @PutMapping("{idTipoDocumento}")
    public ResponseEntity<TipoDocumentoVistaAdminDTO> actualizarTipoDocumento(@PathVariable("idTipoDocumento") Integer idTipoDocumento, @RequestBody TipoDocumentoVistaAdminDTO tipoDocumentoDTO) {
        TipoDocumentoVistaAdminDTO tipoDocumentoBuscado = tipoDocumentoService.buscarTipoDocumentoPorId(idTipoDocumento);
        if(tipoDocumentoBuscado != null) {
            TipoDocumentoVistaAdminDTO tipoDocumentoActualizado = tipoDocumentoService.actualizarTipoDocumento(idTipoDocumento, tipoDocumentoDTO);
            return new ResponseEntity<>(tipoDocumentoActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{idTipoDocumento}")
    public ResponseEntity<String> eliminarTipoDocumento(@PathVariable("idTipoDocumento") Integer idTipoDocumento) {
        TipoDocumentoVistaAdminDTO tipoDocumentoBuscado = tipoDocumentoService.buscarTipoDocumentoPorId(idTipoDocumento);
        if(tipoDocumentoBuscado != null) {
            tipoDocumentoService.eliminarTipoDocumento(idTipoDocumento);
            return new ResponseEntity<>("Tipo documento eliminado satisfactoriamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Tipo documento no encontrado", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<TipoDocumentoVistaAdminDTO>> listarTiposDocumentosTodos() {
        List<TipoDocumentoVistaAdminDTO> tiposDocumentos = tipoDocumentoService.listarTiposDocumentosTodos();
        return new ResponseEntity<>(tiposDocumentos, HttpStatus.OK);
    }

    @GetMapping("{idTipoDocumento}")
    public ResponseEntity<TipoDocumentoVistaAdminDTO> buscarTipoDocumentoPorId(@PathVariable("idTipoDocumento") Integer idTipoDocumento) {
        TipoDocumentoVistaAdminDTO tipoDocumentoBuscado = tipoDocumentoService.buscarTipoDocumentoPorId(idTipoDocumento);
        if(tipoDocumentoBuscado != null)
            return new ResponseEntity<>(tipoDocumentoBuscado, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
