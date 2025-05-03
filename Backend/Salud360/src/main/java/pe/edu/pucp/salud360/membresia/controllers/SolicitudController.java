package pe.edu.pucp.salud360.membresia.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.membresia.dto.SolicitudDTO;
import pe.edu.pucp.salud360.membresia.services.SolicitudService;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
@RequiredArgsConstructor
public class SolicitudController {

    private final SolicitudService solicitudService;

    @GetMapping
    public ResponseEntity<List<SolicitudDTO>> listarSolicitudes() {
        return ResponseEntity.ok(solicitudService.listarSolicitudes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitudDTO> obtenerSolicitud(@PathVariable Integer id) {
        SolicitudDTO solicitud = solicitudService.obtenerSolicitudPorId(id);
        return solicitud != null ? ResponseEntity.ok(solicitud) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<SolicitudDTO> crearSolicitud(@RequestBody SolicitudDTO solicitudDTO) {
        return ResponseEntity.ok(solicitudService.crearSolicitud(solicitudDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SolicitudDTO> actualizarSolicitud(@PathVariable Integer id, @RequestBody SolicitudDTO solicitudDTO) {
        SolicitudDTO actualizado = solicitudService.actualizarSolicitud(id, solicitudDTO);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSolicitud(@PathVariable Integer id) {
        solicitudService.eliminarSolicitud(id);
        return ResponseEntity.noContent().build();
    }
}
