package pe.edu.pucp.salud360.comunidad.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.comunidad.dto.TestimonioDTO;
import pe.edu.pucp.salud360.comunidad.services.TestimonioService;

import java.util.List;

@RestController
@RequestMapping("/api/testimonios")
public class TestimonioController {

    @Autowired
    private TestimonioService testimonioService;

    @PostMapping
    public ResponseEntity<TestimonioDTO> crear(@RequestBody TestimonioDTO dto) {
        return ResponseEntity.ok(testimonioService.crearTestimonio(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonioDTO> actualizar(@PathVariable Integer id, @RequestBody TestimonioDTO dto) {
        return ResponseEntity.ok(testimonioService.actualizarTestimonio(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        return testimonioService.eliminarTestimonio(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<TestimonioDTO>> listar() {
        return ResponseEntity.ok(testimonioService.listarTestimonios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonioDTO> obtener(@PathVariable Integer id) {
        TestimonioDTO dto = testimonioService.obtenerTestimonioPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }
}
