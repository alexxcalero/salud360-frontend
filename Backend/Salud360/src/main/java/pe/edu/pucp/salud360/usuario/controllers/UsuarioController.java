package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dto.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.services.UsuarioService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") //PARA QUE SE CONECTE CON EL FRONT
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioDTO> crearUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO usuarioCreado = usuarioService.crearUsuario(usuarioDTO);
        return new ResponseEntity<>(usuarioCreado, HttpStatus.CREATED);
    }

    @PutMapping("{idUsuario}")
    public ResponseEntity<UsuarioDTO> actualizarUsuario(@PathVariable("idUsuario") Integer idUsuario, @RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO usuarioBuscado = usuarioService.buscarUsuarioPorId(idUsuario);
        if(usuarioBuscado != null) {
            UsuarioDTO usuarioActualizado = usuarioService.actualizarUsuario(idUsuario, usuarioDTO);
            return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{idUsuario}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable("idUsuario") Integer idUsuario) {
        UsuarioDTO usuarioBuscado = usuarioService.buscarUsuarioPorId(idUsuario);
        if(usuarioBuscado != null) {
            usuarioService.eliminarUsuario(idUsuario);
            return new ResponseEntity<>("Usuario eliminado satisfactoriamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarUsuariosTodos() {
        List<UsuarioDTO> usuarios = usuarioService.listarUsuariosTodos();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("{idUsuario}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorId(@PathVariable("idUsuario") Integer idUsuario) {
        UsuarioDTO usuarioBuscado = usuarioService.buscarUsuarioPorId(idUsuario);
        if(usuarioBuscado != null)
            return new ResponseEntity<>(usuarioBuscado, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
