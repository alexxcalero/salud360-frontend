package pe.edu.pucp.salud360.comunidad.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.comunidad.dto.ForoDTO;
import pe.edu.pucp.salud360.comunidad.services.ForoService;

import java.util.List;

@RestController
@RequestMapping("/api/foros")
public class ForoController {
    @Autowired
    private ForoService foroService;

    @PostMapping
    public ResponseEntity<ForoDTO> crear(@RequestBody ForoDTO dto) {
        return ResponseEntity.ok(foroService.crearForo(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ForoDTO> actualizar(@PathVariable Integer id, @RequestBody ForoDTO dto) {
        ForoDTO actualizado = foroService.actualizarForo(id, dto);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        return foroService.eliminarForo(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ForoDTO> buscar(@PathVariable Integer id) {
        ForoDTO dto = foroService.buscarPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ForoDTO>> listar() {
        return ResponseEntity.ok(foroService.listarTodos());
    }
}

