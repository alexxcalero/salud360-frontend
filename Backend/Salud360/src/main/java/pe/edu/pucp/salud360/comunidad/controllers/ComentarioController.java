package pe.edu.pucp.salud360.comunidad.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.comunidad.dto.ComentarioDTO;
import pe.edu.pucp.salud360.comunidad.services.ComentarioService;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @PostMapping
    public ResponseEntity<ComentarioDTO> crearComentario(@RequestBody ComentarioDTO comentarioDTO) {
        ComentarioDTO creado = comentarioService.crearComentario(comentarioDTO);
        return new ResponseEntity<>(creado, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ComentarioDTO>> listarComentarios() {
        List<ComentarioDTO> lista = comentarioService.listarComentarios();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComentarioDTO> obtenerComentario(@PathVariable Integer id) {
        ComentarioDTO encontrado = comentarioService.buscarComentarioPorId(id);
        if (encontrado != null) {
            return new ResponseEntity<>(encontrado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComentarioDTO> actualizarComentario(@PathVariable Integer id, @RequestBody ComentarioDTO dto) {
        ComentarioDTO actualizado = comentarioService.actualizarComentario(id, dto);
        if (actualizado != null) {
            return new ResponseEntity<>(actualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarComentario(@PathVariable Integer id) {
        boolean eliminado = comentarioService.eliminarComentario(id);
        if (eliminado) {
            return new ResponseEntity<>("Comentario eliminado correctamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Comentario no encontrado", HttpStatus.NOT_FOUND);
    }
}

