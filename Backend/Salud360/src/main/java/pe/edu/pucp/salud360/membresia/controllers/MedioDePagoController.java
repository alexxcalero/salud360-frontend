package pe.edu.pucp.salud360.membresia.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.membresia.dto.MedioDePagoDTO;
import pe.edu.pucp.salud360.membresia.services.MedioDePagoService;

import java.util.List;

@RestController
@RequestMapping("/api/medioDePago")
public class MedioDePagoController {

    @Autowired
    private MedioDePagoService medioDePagoService;

    @GetMapping
    public ResponseEntity<List<MedioDePagoDTO>> listar() {
        return ResponseEntity.ok(medioDePagoService.listar());
    }

    @PostMapping
    public ResponseEntity<MedioDePagoDTO> crear(@RequestBody MedioDePagoDTO dto) {
        return ResponseEntity.ok(medioDePagoService.crear(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedioDePagoDTO> obtener(@PathVariable Integer id) {
        return ResponseEntity.ok(medioDePagoService.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedioDePagoDTO> actualizar(@PathVariable Integer id, @RequestBody MedioDePagoDTO dto) {
        return ResponseEntity.ok(medioDePagoService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        boolean eliminado = medioDePagoService.eliminar(id);
        return eliminado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}

