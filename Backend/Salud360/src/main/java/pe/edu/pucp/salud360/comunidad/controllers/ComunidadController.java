package pe.edu.pucp.salud360.comunidad.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.comunidad.dto.ComunidadDTO;
import pe.edu.pucp.salud360.comunidad.services.ComunidadService;

import java.util.List;

@RestController
@RequestMapping("/api/comunidades")
public class ComunidadController {

    @Autowired
    private ComunidadService comunidadService;

    @PostMapping
    public ResponseEntity<ComunidadDTO> crear(@RequestBody ComunidadDTO dto) {
        ComunidadDTO creada = comunidadService.crearComunidad(dto);
        return new ResponseEntity<>(creada, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComunidadDTO> actualizar(@PathVariable Integer id, @RequestBody ComunidadDTO dto) {
        ComunidadDTO actualizada = comunidadService.actualizarComunidad(id, dto);
        return actualizada != null
                ? new ResponseEntity<>(actualizada, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        return comunidadService.eliminarComunidad(id)
                ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComunidadDTO> obtener(@PathVariable Integer id) {
        ComunidadDTO comunidad = comunidadService.obtenerComunidadPorId(id);
        return comunidad != null
                ? new ResponseEntity<>(comunidad, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<ComunidadDTO>> listar() {
        return new ResponseEntity<>(comunidadService.listarComunidades(), HttpStatus.OK);
    }
}
