package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dto.TipoDocumentoDTO;
import pe.edu.pucp.salud360.usuario.services.TipoDocumentoService;

import java.util.List;

@RestController
@RequestMapping("/api/tiposDocumentos")
public class TipoDocumentoController {
    @Autowired
    private TipoDocumentoService tipoDocumentoService;

    @PostMapping
    public ResponseEntity<TipoDocumentoDTO> crearTipoDocumento(@RequestBody TipoDocumentoDTO tipoDocumentoDTO) {
        TipoDocumentoDTO tipoDocumentoCreado = tipoDocumentoService.crearTipoDocumento(tipoDocumentoDTO);
        return new ResponseEntity<>(tipoDocumentoCreado, HttpStatus.CREATED);
    }

    @PutMapping("{idTipoDocumento}")
    public ResponseEntity<TipoDocumentoDTO> actualizarTipoDocumento(@PathVariable("idTipoDocumento") Integer idTipoDocumento, @RequestBody TipoDocumentoDTO tipoDocumentoDTO) {
        TipoDocumentoDTO tipoDocumentoBuscado = tipoDocumentoService.buscarTipoDocumentoPorId(idTipoDocumento);
        if(tipoDocumentoBuscado != null) {
            TipoDocumentoDTO tipoDocumentoActualizado = tipoDocumentoService.actualizarTipoDocumento(idTipoDocumento, tipoDocumentoDTO);
            return new ResponseEntity<>(tipoDocumentoActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{idTipoDocumento}")
    public ResponseEntity<String> eliminarTipoDocumento(@PathVariable("idTipoDocumento") Integer idTipoDocumento) {
        TipoDocumentoDTO tipoDocumentoBuscado = tipoDocumentoService.buscarTipoDocumentoPorId(idTipoDocumento);
        if(tipoDocumentoBuscado != null) {
            tipoDocumentoService.eliminarTipoDocumento(idTipoDocumento);
            return new ResponseEntity<>("Tipo documento eliminado satisfactoriamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Tipo documento no encontrado", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<TipoDocumentoDTO>> listarTiposDocumentosTodos() {
        List<TipoDocumentoDTO> tiposDocumentos = tipoDocumentoService.listarTiposDocumentosTodos();
        return new ResponseEntity<>(tiposDocumentos, HttpStatus.OK);
    }

    @GetMapping("{idTipoDocumento}")
    public ResponseEntity<TipoDocumentoDTO> buscarTipoDocumentoPorId(@PathVariable("idTipoDocumento") Integer idTipoDocumento) {
        TipoDocumentoDTO tipoDocumentoBuscado = tipoDocumentoService.buscarTipoDocumentoPorId(idTipoDocumento);
        if(tipoDocumentoBuscado != null)
            return new ResponseEntity<>(tipoDocumentoBuscado, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
