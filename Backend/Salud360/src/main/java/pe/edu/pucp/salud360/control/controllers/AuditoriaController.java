package pe.edu.pucp.salud360.control.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.control.dto.AuditoriaDTO;
import pe.edu.pucp.salud360.control.services.AuditoriaService;

import java.util.List;

@RestController
@RequestMapping("/api/auditorias")
public class AuditoriaController {

    @Autowired
    private AuditoriaService auditoriaService;

    @PostMapping
    public ResponseEntity<AuditoriaDTO> crearAuditoria(@RequestBody AuditoriaDTO auditoriaDTO) {
        AuditoriaDTO nueva = auditoriaService.crearAuditoria(auditoriaDTO);
        return new ResponseEntity<>(nueva, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AuditoriaDTO>> listarAuditorias() {
        return ResponseEntity.ok(auditoriaService.listarAuditorias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuditoriaDTO> obtenerPorId(@PathVariable Integer id) {
        AuditoriaDTO auditoria = auditoriaService.obtenerAuditoriaPorId(id);
        if (auditoria != null) {
            return ResponseEntity.ok(auditoria);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuditoriaDTO> actualizarAuditoria(@PathVariable Integer id, @RequestBody AuditoriaDTO auditoriaDTO) {
        AuditoriaDTO actualizada = auditoriaService.actualizarAuditoria(id, auditoriaDTO);
        if (actualizada != null) {
            return ResponseEntity.ok(actualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAuditoria(@PathVariable Integer id) {
        boolean eliminado = auditoriaService.eliminarAuditoria(id);
        if (eliminado) {
            return ResponseEntity.ok("Auditoría eliminada correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Auditoría no encontrada.");
        }
    }
}

