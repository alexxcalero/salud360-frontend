package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dtos.permisoDTO.PermisoVistaAdminDTO;
import pe.edu.pucp.salud360.usuario.services.PermisoService;

import java.util.List;

@RestController
@RequestMapping("/api/permisos")
public class PermisoController {
    @Autowired
    private PermisoService permisoService;

    @PostMapping
    public ResponseEntity<PermisoVistaAdminDTO> crearPermiso(@RequestBody PermisoVistaAdminDTO permisoDTO) {
        PermisoVistaAdminDTO permisoCreado = permisoService.crearPermiso(permisoDTO);
        return new ResponseEntity<>(permisoService.buscarPermisoPorId(permisoCreado.getIdPermiso()), HttpStatus.CREATED);
    }

    @PutMapping("{idPermiso}")
    public ResponseEntity<PermisoVistaAdminDTO> actualizarPermiso(@PathVariable("idPermiso") Integer idPermiso, @RequestBody PermisoVistaAdminDTO permisoDTO) {
        PermisoVistaAdminDTO permisoBuscado = permisoService.buscarPermisoPorId(idPermiso);
        if (permisoBuscado != null) {
            PermisoVistaAdminDTO permisoActualizado = permisoService.actualizarPermiso(idPermiso, permisoDTO);
            return new ResponseEntity<>(permisoActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{idPermiso}")
    public ResponseEntity<String> eliminarPermiso(@PathVariable("idPermiso") Integer idPermiso) {
        PermisoVistaAdminDTO permisoBuscado = permisoService.buscarPermisoPorId(idPermiso);
        if (permisoBuscado != null) {
            permisoService.eliminarPermiso(idPermiso);
            return new ResponseEntity<>("Permiso eliminado satisfactoriamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Permiso no encontrado", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<PermisoVistaAdminDTO>> listarPermisosTodos() {
        List<PermisoVistaAdminDTO> permisos = permisoService.listarPermisosTodos();
        return new ResponseEntity<>(permisos, HttpStatus.OK);
    }

    @GetMapping("{idPermiso}")
    public ResponseEntity<PermisoVistaAdminDTO> buscarPermisoPorId(@PathVariable("idPermiso") Integer idPermiso) {
        PermisoVistaAdminDTO permisoBuscado = permisoService.buscarPermisoPorId(idPermiso);
        if (permisoBuscado != null)
            return new ResponseEntity<>(permisoBuscado, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
