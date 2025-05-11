package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dtos.MedicoDTO;
import pe.edu.pucp.salud360.usuario.services.MedicoService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") //PARA QUE SE CONECTE CON EL FRONT
@RestController
@RequestMapping("/api/medicos")
public class MedicoController {
    @Autowired
    private MedicoService medicoService;

    @PostMapping
    public ResponseEntity<MedicoDTO> crearMedico(@RequestBody MedicoDTO medicoDTO) {
        MedicoDTO medicoCreado = medicoService.crearMedico(medicoDTO);
        return new ResponseEntity<>(medicoCreado, HttpStatus.CREATED);
    }

    @PutMapping("{idMedico}")
    public ResponseEntity<MedicoDTO> actualizarMedico(@PathVariable("idMedico") Integer idMedico, @RequestBody MedicoDTO medicoDTO) {
        MedicoDTO medicoBuscado = medicoService.buscarMedicoPorId(idMedico);
        if (medicoBuscado != null) {
            MedicoDTO medicoActualizado = medicoService.actualizarMedico(idMedico, medicoDTO);
            return new ResponseEntity<>(medicoActualizado, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{idMedico}")
    public ResponseEntity<String> eliminarMedico(@PathVariable("idMedico") Integer idMedico) {
        MedicoDTO medicoBuscado = medicoService.buscarMedicoPorId(idMedico);
        if (medicoBuscado != null) {
            medicoService.eliminarMedico(idMedico);
            return new ResponseEntity<>("Médico eliminado satisfactoriamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Médico no encontrado", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<MedicoDTO>> listarMedicosTodos() {
        List<MedicoDTO> medicos = medicoService.listarMedicosTodos();
        return new ResponseEntity<>(medicos, HttpStatus.OK);
    }

    @GetMapping("{idMedico}")
    public ResponseEntity<MedicoDTO> buscarMedicoPorId(@PathVariable("idMedico") Integer idMedico) {
        MedicoDTO medicoBuscado = medicoService.buscarMedicoPorId(idMedico);
        if (medicoBuscado != null)
            return new ResponseEntity<>(medicoBuscado, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
