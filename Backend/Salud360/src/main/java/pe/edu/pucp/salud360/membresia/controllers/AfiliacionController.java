package pe.edu.pucp.salud360.membresia.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.membresia.dto.AfiliacionDTO;
import pe.edu.pucp.salud360.membresia.services.AfiliacionService;

import java.util.List;

@RestController
@RequestMapping("/api/afiliaciones")
public class AfiliacionController {

    @Autowired
    private AfiliacionService afiliacionService;

    @PostMapping
    public ResponseEntity<AfiliacionDTO> crearAfiliacion(@RequestBody AfiliacionDTO dto) {
        return ResponseEntity.ok(afiliacionService.crearAfiliacion(dto));
    }

    @GetMapping
    public ResponseEntity<List<AfiliacionDTO>> listarAfiliaciones() {
        return ResponseEntity.ok(afiliacionService.listarAfiliaciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AfiliacionDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(afiliacionService.buscarAfiliacionPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AfiliacionDTO> actualizarAfiliacion(@PathVariable Integer id, @RequestBody AfiliacionDTO dto) {
        return ResponseEntity.ok(afiliacionService.actualizarAfiliacion(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> eliminarAfiliacion(@PathVariable Integer id) {
        return ResponseEntity.ok(afiliacionService.eliminarAfiliacion(id));
    }
}

