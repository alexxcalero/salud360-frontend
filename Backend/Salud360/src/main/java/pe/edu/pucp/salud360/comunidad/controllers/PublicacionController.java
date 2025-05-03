package pe.edu.pucp.salud360.comunidad.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.comunidad.dto.PublicacionDTO;
import pe.edu.pucp.salud360.comunidad.services.PublicacionService;

import java.util.List;

@RestController
@RequestMapping("/api/publicaciones")
public class PublicacionController {

    @Autowired
    private PublicacionService publicacionService;

    @PostMapping
    public ResponseEntity<PublicacionDTO> crearPublicacion(@RequestBody PublicacionDTO dto) {
        PublicacionDTO creada = publicacionService.crearPublicacion(dto);
        return new ResponseEntity<>(creada, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PublicacionDTO>> listarPublicaciones() {
        return new ResponseEntity<>(publicacionService.listarPublicaciones(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicacionDTO> obtenerPublicacionPorId(@PathVariable Integer id) {
        PublicacionDTO publicacion = publicacionService.obtenerPublicacionPorId(id);
        return publicacion != null ? new ResponseEntity<>(publicacion, HttpStatus.OK)
                : new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PublicacionDTO> actualizarPublicacion(@PathVariable Integer id, @RequestBody PublicacionDTO dto) {
        PublicacionDTO actualizada = publicacionService.actualizarPublicacion(id, dto);
        return actualizada != null ? new ResponseEntity<>(actualizada, HttpStatus.OK)
                : new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPublicacion(@PathVariable Integer id) {
        boolean eliminado = publicacionService.eliminarPublicacion(id);
        return eliminado ? new ResponseEntity<>("Publicación eliminada correctamente", HttpStatus.OK)
                : new ResponseEntity<>("Publicación no encontrada", HttpStatus.NOT_FOUND);
    }
}

