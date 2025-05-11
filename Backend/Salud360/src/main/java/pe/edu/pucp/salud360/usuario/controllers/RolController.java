package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dtos.rolDTO.RolVistaAdminDTO;
import pe.edu.pucp.salud360.usuario.services.RolService;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController {
    @Autowired
    private RolService rolService;

    @PostMapping
    public ResponseEntity<RolVistaAdminDTO> crearRol(@RequestBody RolVistaAdminDTO rolDTO) {
        RolVistaAdminDTO rolCreado = rolService.crearRol(rolDTO);
        return new ResponseEntity<>(rolService.buscarRolPorId(rolCreado.getIdRol()), HttpStatus.CREATED);
    }

    @PutMapping("{idRol}")
    public ResponseEntity<RolVistaAdminDTO> actualizarRol(@PathVariable("idRol") Integer idRol, @RequestBody RolVistaAdminDTO rolDTO) {
        RolVistaAdminDTO rolBuscado = rolService.buscarRolPorId(idRol);
        if(rolBuscado != null) {
            RolVistaAdminDTO rolActualizado = rolService.actualizarRol(idRol, rolDTO);
            return new ResponseEntity<>(rolActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{idRol}")
    public ResponseEntity<String> eliminarRol(@PathVariable("idRol") Integer idRol) {
        RolVistaAdminDTO rolBuscado = rolService.buscarRolPorId(idRol);
        if(rolBuscado != null) {
            rolService.eliminarRol(idRol);
            return new ResponseEntity<>("Rol eliminado satisfactoriamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Rol no encontrado", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<RolVistaAdminDTO>> listarRolesTodos() {
        List<RolVistaAdminDTO> roles = rolService.listarRolesTodos();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @GetMapping("{idRol}")
    public ResponseEntity<RolVistaAdminDTO> buscarRolPorId(@PathVariable("idRol") Integer idRol) {
        RolVistaAdminDTO rolBuscado = rolService.buscarRolPorId(idRol);
        if(rolBuscado != null)
            return new ResponseEntity<>(rolBuscado, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
