package pe.edu.pucp.salud360.usuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.pucp.salud360.usuario.dtos.PersonaDTO;
import pe.edu.pucp.salud360.usuario.services.PersonaService;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
public class PersonaController {
    @Autowired
    private PersonaService personaService;

    @PostMapping
    public ResponseEntity<PersonaDTO> crearPersona(@RequestBody PersonaDTO personaDTO) {
        PersonaDTO personaCreada = personaService.crearPersona(personaDTO);
        return new ResponseEntity<>(personaCreada, HttpStatus.CREATED);
    }

    @PutMapping("{idPersona}")
    public ResponseEntity<PersonaDTO> actualizarPersona(@PathVariable("idPersona") Integer idPersona, @RequestBody PersonaDTO personaDTO) {
        PersonaDTO personaBuscada = personaService.buscarPersonaPorId(idPersona);
        if (personaBuscada != null) {
            PersonaDTO personaActualizada = personaService.actualizarPersona(idPersona, personaDTO);
            return new ResponseEntity<>(personaActualizada, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{idPersona}")
    public ResponseEntity<String> eliminarPersona(@PathVariable("idPersona") Integer idPersona) {
        PersonaDTO personaBuscada = personaService.buscarPersonaPorId(idPersona);
        if (personaBuscada != null) {
            personaService.eliminarPersona(idPersona);
            return new ResponseEntity<>("Persona eliminada satisfactoriamente", HttpStatus.OK);
        }
        return new ResponseEntity<>("Persona no encontrada", HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<PersonaDTO>> listarPersonasTodas() {
        List<PersonaDTO> personas = personaService.listarPersonasTodas();
        return new ResponseEntity<>(personas, HttpStatus.OK);
    }

    @GetMapping("{idPersona}")
    public ResponseEntity<PersonaDTO> buscarPersonaPorId(@PathVariable("idPersona") Integer idPersona) {
        PersonaDTO personaBuscada = personaService.buscarPersonaPorId(idPersona);
        if (personaBuscada != null)
            return new ResponseEntity<>(personaBuscada, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
