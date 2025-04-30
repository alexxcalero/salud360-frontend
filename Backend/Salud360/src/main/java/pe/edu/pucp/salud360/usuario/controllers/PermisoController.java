package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dto.PermisoDTO;
import pe.edu.pucp.salud360.usuario.services.PermisoService;

import java.util.List;

@RestController
@RequestMapping("/api/permisos")
public class PermisoController {
    @Autowired
    private PermisoService permisoService;

    @PostMapping
    public ResponseEntity<PermisoDTO> crearPermiso(@RequestBody PermisoDTO permisoDTO) {
        PermisoDTO permisoCreado = permisoService.crearPermiso(permisoDTO);
        return new ResponseEntity<>(permisoCreado, HttpStatus.CREATED);
    }

    @PutMapping("{idPermiso}")
    public ResponseEntity<PermisoDTO> actualizarPermiso(@PathVariable("idPermiso") Integer idPermiso, @RequestBody PermisoDTO permisoDTO) {
        PermisoDTO permisoBuscado = permisoService.buscarPermisoPorId(idPermiso);
        if (permisoBuscado != null) {
            PermisoDTO permisoActualizado = permisoService.actualizarPermiso(idPermiso, permisoDTO);
            return new ResponseEntity<>(permisoActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{idPermiso}")
    public ResponseEntity<String> eliminarPermiso(@PathVariable("idPermiso") Integer idPermiso) {
        PermisoDTO permisoBuscado = permisoService.buscarPermisoPorId(idPermiso);
        if (permisoBuscado != null) {
            permisoService.eliminarPermiso(idPermiso);
            return new ResponseEntity<>("Permiso eliminado satisfactoriamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Permiso no encontrado", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<PermisoDTO>> listarPermisosTodos() {
        List<PermisoDTO> permisos = permisoService.listarPermisosTodos();
        return new ResponseEntity<>(permisos, HttpStatus.OK);
    }

    @GetMapping("{idPermiso}")
    public ResponseEntity<PermisoDTO> buscarPermisoPorId(@PathVariable("idPermiso") Integer idPermiso) {
        PermisoDTO permisoBuscado = permisoService.buscarPermisoPorId(idPermiso);
        if (permisoBuscado != null)
            return new ResponseEntity<>(permisoBuscado, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
