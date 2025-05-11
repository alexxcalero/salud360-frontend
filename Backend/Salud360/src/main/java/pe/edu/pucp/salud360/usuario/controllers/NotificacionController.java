package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dtos.NotificacionDTO;
import pe.edu.pucp.salud360.usuario.services.NotificacionService;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {
    @Autowired
    private NotificacionService notificacionService;

    @PostMapping
    public ResponseEntity<NotificacionDTO> crearNotificacion(@RequestBody NotificacionDTO notificacionDTO) {
        NotificacionDTO notificacionCreada = notificacionService.crearNotificacion(notificacionDTO);
        return new ResponseEntity<>(notificacionCreada, HttpStatus.CREATED);
    }

    @PutMapping("{idNotificacion}")
    public ResponseEntity<NotificacionDTO> actualizarNotificacion(@PathVariable("idNotificacion") Integer idNotificacion, @RequestBody NotificacionDTO notificacionDTO) {
        NotificacionDTO notificacionBuscada = notificacionService.buscarNotificacionPorId(idNotificacion);
        if(notificacionBuscada != null) {
            NotificacionDTO notificacionActualizada = notificacionService.actualizarNotificacion(idNotificacion, notificacionDTO);
            return new ResponseEntity<>(notificacionActualizada, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{idNotificacion}")
    public ResponseEntity<String> eliminarNotificacion(@PathVariable("idNotificacion") Integer idNotificacion) {
        NotificacionDTO notificacionBuscada = notificacionService.buscarNotificacionPorId(idNotificacion);
        if(notificacionBuscada != null) {
            notificacionService.eliminarNotificacion(idNotificacion);
            return new ResponseEntity<>("Notificacion eliminada satisfactoriamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Notificacion no encontrada", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<NotificacionDTO>> listarNotificacionesTodas() {
        List<NotificacionDTO> notificaciones = notificacionService.listarNotificacionesTodas();
        return new ResponseEntity<>(notificaciones, HttpStatus.OK);
    }

    @GetMapping("{idNotificacion}")
    public ResponseEntity<NotificacionDTO> buscarNotificacionPorId(@PathVariable("idNotificacion") Integer idNotificacion) {
        NotificacionDTO notificacionBuscada = notificacionService.buscarNotificacionPorId(idNotificacion);
        if(notificacionBuscada != null)
            return new ResponseEntity<>(notificacionBuscada, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
