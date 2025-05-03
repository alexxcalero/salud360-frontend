package pe.edu.pucp.salud360.membresia.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.membresia.dto.PagoDTO;
import pe.edu.pucp.salud360.membresia.services.PagoService;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
public class PagoController {

    private final PagoService pagoService;

    @GetMapping
    public ResponseEntity<List<PagoDTO>> listarPagos() {
        return ResponseEntity.ok(pagoService.listarPagos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagoDTO> obtenerPago(@PathVariable Integer id) {
        PagoDTO pago = pagoService.obtenerPagoPorId(id);
        return pago != null ? ResponseEntity.ok(pago) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<PagoDTO> crearPago(@RequestBody PagoDTO pagoDTO) {
        return ResponseEntity.ok(pagoService.crearPago(pagoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagoDTO> actualizarPago(@PathVariable Integer id, @RequestBody PagoDTO pagoDTO) {
        PagoDTO actualizado = pagoService.actualizarPago(id, pagoDTO);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPago(@PathVariable Integer id) {
        pagoService.eliminarPago(id);
        return ResponseEntity.noContent().build();
    }
}
