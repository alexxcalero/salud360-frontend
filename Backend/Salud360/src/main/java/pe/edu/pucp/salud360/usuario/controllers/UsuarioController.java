package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dtos.usuarioDTO.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.services.UsuarioService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // PARA QUE SE CONECTE CON EL FRONT
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    //easter egg
    //easter    

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

    @PutMapping("{idUsuario}/actualizarDocumento")
    public ResponseEntity<UsuarioDTO> actualizarNumeroDocumento(@PathVariable("idUsuario") Integer idUsuario,
                                                                @RequestParam("idTipoDocumento") Integer idTipoDocumento,
                                                                @RequestParam("numeroDocumento") String numeroDocumento) {
        UsuarioDTO usuarioBuscado = usuarioService.buscarUsuarioPorId(idUsuario);
        if(usuarioBuscado != null) {
            UsuarioDTO usuarioActualizado = usuarioService.actualizarNumeroDocumento(idUsuario, idTipoDocumento, numeroDocumento);
            return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping("{idUsuario}/cambiarFotoPerfil")
    public ResponseEntity<UsuarioDTO> actualizarFotoPerfil(@PathVariable("idUsuario") Integer idUsuario, @RequestParam("fotoPerfil") String fotoPerfil) {
        UsuarioDTO usuarioBuscado = usuarioService.buscarUsuarioPorId(idUsuario);
        if(usuarioBuscado != null) {
            UsuarioDTO usuarioActualizado = usuarioService.actualizarFotoPerfil(idUsuario, fotoPerfil);
            return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping("{idUsuario}/cambiarContrasenha")
    public ResponseEntity<UsuarioDTO> actualizarContrasenha(@PathVariable("idUsuario") Integer idUsuario, @RequestParam("contrasenha") String contrasenha) {
        UsuarioDTO usuarioBuscado = usuarioService.buscarUsuarioPorId(idUsuario);
        if(usuarioBuscado != null) {
            UsuarioDTO usuarioActualizado = usuarioService.actualizarContrasenha(idUsuario, contrasenha);
            return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/login")
    public ResponseEntity<String> iniciarSesion(@RequestParam("correo") String correo,
                                                @RequestParam("contrasenha") String contrasenhaIngresada) {
        UsuarioDTO usuarioBuscado = usuarioService.buscarUsuarioPorCorreo(correo);
        if(usuarioBuscado != null) {
            String contrasenhaUsuario = usuarioBuscado.getContrasenha();
            if(passwordEncoder.matches(contrasenhaIngresada, contrasenhaUsuario)) {
                return new ResponseEntity<>("Se ha iniciado sesión", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("La contraseña ingresada es incorrecta", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>("El correo ingresado es incorrecto", HttpStatus.NOT_FOUND);
        }
    }
}
