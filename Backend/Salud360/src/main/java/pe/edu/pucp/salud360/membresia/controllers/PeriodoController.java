package pe.edu.pucp.salud360.membresia.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.membresia.dto.PeriodoDTO;
import pe.edu.pucp.salud360.membresia.services.PeriodoService;

import java.util.List;

@RestController
@RequestMapping("/api/periodos")
@RequiredArgsConstructor
public class PeriodoController {

    private final PeriodoService periodoService;

    @GetMapping
    public ResponseEntity<List<PeriodoDTO>> listarPeriodos() {
        return ResponseEntity.ok(periodoService.listarPeriodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PeriodoDTO> obtenerPeriodo(@PathVariable Integer id) {
        PeriodoDTO periodo = periodoService.obtenerPeriodoPorId(id);
        return periodo != null ? ResponseEntity.ok(periodo) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<PeriodoDTO> crearPeriodo(@RequestBody PeriodoDTO periodoDTO) {
        return ResponseEntity.ok(periodoService.crearPeriodo(periodoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PeriodoDTO> actualizarPeriodo(@PathVariable Integer id, @RequestBody PeriodoDTO periodoDTO) {
        PeriodoDTO actualizado = periodoService.actualizarPeriodo(id, periodoDTO);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPeriodo(@PathVariable Integer id) {
        periodoService.eliminarPeriodo(id);
        return ResponseEntity.noContent().build();
    }
}
